"use server";

import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseCreateSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, {  fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "@/lib/stripe";


const aj =arcjet.withRule(
    fixedWindow({
        mode:"LIVE",
        window:"1m",
        max:5,
    })
);

export async function CreateCourse(values:CourseSchemaType): Promise<ApiResponse>{
    const session = await requireAdmin();
    try{
        const req = await request();
        const decision = await arcjet.protect(req,{
            fingerprint:session.user.id,


        })
        if (decision.isDenied()){
            if (decision.reason.isRateLimit()){
                return {
                    status:"error",
                    message:"Rate limit exceeded",
                }
            }
            else{
                return {
                    status:"error",
                    message:"Bot detected",

                }
            }
        }

        const validation  = CourseCreateSchema.safeParse(values);
        if (!validation.success){
            return {
                status:"error",
                message:"Invalid Form Data",
            };
        }
        const data = await stripe.products.create({
            name:validation.data.title,
            description:validation.data.smallDescription,
            default_price_data:{
                currency:"usd",
                unit_amount:validation.data.price * 100,
            },
        });
        await prisma.course.create({
            data:{
                ...validation.data,
                userId:session?.user.id as string,
                stripePriceId:data.default_price as string,
            },
        });
        return {
            status:"success",
            message:"Course created sucessfully",
        }
    /*// After creating course in database
const stripeProduct = await stripe.products.create({
  name: course.title,
  description: course.smallDescription,
  metadata: {
    courseId: course.id,
  },
});

const stripePrice = await stripe.prices.create({
  product: stripeProduct.id,
  unit_amount: course.price * 100,
  currency: "usd",
});

// Save stripeProductId and stripePriceId to your course in database
await prisma.course.update({
  where: { id: course.id },
  data: {
    stripeProductId: stripeProduct.id,
    stripePriceId: stripePrice.id,
  },
});
*/
    }
    catch {

        return {
        status:"error",
        message:"failed to create course"
        }

    }


}