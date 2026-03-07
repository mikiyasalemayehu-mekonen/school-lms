import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { headers } from "next/headers";

import Stripe from "stripe";

export async function POST(req:Request){
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;
    let event: Stripe.Event;

    try{
        event = Stripe.webhooks.constructEvent(body,signature,env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Webhook verified:", event.type);
    }
    catch(error){
        console.error("❌ Webhook verification failed:", error);
        return new Response("Webhook signature verification failed",{
            status:400,
        });

    }
    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed"){
        console.log("💳 Processing checkout.session.completed");
        console.log("Metadata:", session.metadata);

        const  courseId = session.metadata?.courseId;
        const enrollmentId = session.metadata?.enrollmentId;
        const customerId = session.customer as string;
        
        if (!courseId ){
            console.error("❌ CourseId not found in metadata");
            return new Response("CourseId not found", { status: 400 });
        }
        
        if (!enrollmentId){
            console.error("❌ EnrollmentId not found in metadata");
            return new Response("EnrollmentId not found", { status: 400 });
        }
        
        const user = await prisma.user.findUnique({
            where:{
                stripeCustomerId:customerId,
            },
        });
        
        if (!user){
            console.error("❌ User not found for customer:", customerId);
            return new Response("User not found", { status: 400 });
        }

        console.log("Updating enrollment:", enrollmentId);
        await prisma.enrollment.update({
            where:{
                id:enrollmentId,
            },
            data:{
                status:"Active",
                amount: (session.amount_total || 0) / 100,
            },
        });
        console.log("✅ Enrollment updated to Active");

    }
    return new Response(null,{
        status:200,
    });
}
