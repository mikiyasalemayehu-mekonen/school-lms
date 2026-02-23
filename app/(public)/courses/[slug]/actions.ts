"use server";


import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {stripe} from "@/lib/stripe";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj  =  arcjet.withRule(
    fixedWindow({
        mode:"LIVE",
        window:"1m",
        max:5,
    })
);




export async function enrollInCourseAction(courseId:string):Promise<ApiResponse | never>{
    const user = await requireUser();
    let checkoutUrl : string;
try{
    const req = await request();
    const decision = await aj.protect(req,{
        fingerprint:user.id,

    });
    if (decision.isDenied()){
        return {
            status:"error",
            message:"You have been blocked from performing this action due to suspicious activity. Please try again later.",
        };
    }
    const course = await prisma.course.findUnique({
        where:{
            id:courseId,
        },
        select:{
            id:true,
            title:true,
            price:true,
            slug:true,
        },

    });
    if (!course){
        return {
            status:"error",
            message:"course not found",
        };
    }
    let stripeCustomerId : string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
        where:{
            id: user.id,
        },
        select:{
            stripeCustomerId:true,
        }
    });
    if(userWithStripeCustomerId?.stripeCustomerId){
        stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    }
    else{

        const customer = await stripe.customers.create({
            name: user.name ,
            email: user.email ,
            metadata:{
                userId: user.id,
            },
        });
        stripeCustomerId = customer.id;
        await prisma.user.update({
            where:{
                id:user.id,
            },
            data:{
                stripeCustomerId:stripeCustomerId,
            },
        });
    }
    const result = await prisma.$transaction(async (tx) => {
        const existingEnrollment = await tx.enrollment.findUnique({
            where:{
                userId_courseId:{
                    userId:user.id,
                    courseId:courseId,
                },
            },
            select:{
                status:true,
                id:true,
            },

        });
        if(existingEnrollment?.status === "Active"){
            return {
                status:"success",
                message:"You are already enrolled in this Course",
            };

        }
        let enrollment;
        if(existingEnrollment){
            enrollment = await tx.enrollment.update({
                where:{
                    id:existingEnrollment.id,
                },
                data:{
                    amount: course.price,
                    status:"Pending",
                    updatedAt: new Date(),
                },
            });
        }
        else{
            enrollment = await tx.enrollment.create({
                data:{
                    courseId:course.id,
                    userId:user.id,
                    amount: course.price,
                    status:"Pending",
                },
            });
        }
        const checkoutSession = await stripe.checkout.sessions.create({
            customer:stripeCustomerId,
            line_items:[
                {
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name:course.title,
                            metadata:{
                                courseId:course.id,
                            },
                        },
                        unit_amount: course.price * 100,
                    },
                    quantity:1,
                }
            ],
            mode:"payment",
            success_url: `${env.BETTER_AUTH_URL}/payment/success`,
            cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
            metadata:{
                userId: user.id,
                courseId: course.id,
                enrollmentId: enrollment.id,
            },
        });


        return {
            enrollment:enrollment,
            checkoutUrl: checkoutSession.url,
        };
    });
    checkoutUrl = result.checkoutUrl as string;


}

catch(error){

    if (error instanceof Stripe.errors.StripeError){
        return {
            status:"error",
            message:"Payment processing failed. Please try again later.",
        }
    }

    return {
        status:"error",
        message:"failed to enroll in course",
    }
}
redirect(checkoutUrl);
}