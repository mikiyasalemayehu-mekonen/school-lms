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
        const customerId = session.customer as string;
        if (!courseId ){
            console.error("❌ CourseId not found in metadata");
            throw new Error("CourseId is not Found");

            };
        const user = await prisma.user.findUnique({
            where:{
                stripeCustomerId:customerId,
            },
        });
        if (!user){
            console.error("❌ User not found for customer:", customerId);
            throw new Error("User not found ....");
        }

        console.log("Updating enrollment:", session.metadata?.enrollmentId);
        await prisma.enrollment.update({
            where:{
                id:session.metadata?.enrollmentId as string,
            },
            data:{
                userId:user.id,
                courseId:courseId,
                amount:session.amount_total as number,
                status:"Active",
            },
        });
        console.log("✅ Enrollment updated to Active");

    }
    return new Response(null,{
        status:200,
    });
}
