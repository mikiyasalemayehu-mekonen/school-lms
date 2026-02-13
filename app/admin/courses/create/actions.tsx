"use server";

import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseCreateSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, {  fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";


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
        const data = await prisma.course.create({
            data:{
                ...validation.data,
                userId:session?.user.id as string,
            },
        });
        return {
            status:"success",
            message:"Course created sucessfully",
        }
    }
    catch (error) {
        console.error("Course creation error:", error);
        return {
        status:"error",
        message:"failed to create course"
        }

    }


}