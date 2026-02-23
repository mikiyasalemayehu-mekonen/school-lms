"use server"

import { requireAdmin } from "@/app/data/admin/require-admin"
import { prisma } from "@/lib/db"
import { ApiResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"
import arcjet from "@/lib/arcjet";
import { request } from "@arcjet/next";



export async function deleteCourse(courseId:string): Promise<ApiResponse>{
    const session = await requireAdmin()
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
                }}
        await  prisma.course.delete({
            where:{
                id:courseId
            }
        });
        revalidatePath("/admin/courses")
        return {
            status: "success",
            message: "Course deleted successfully"
        }
    }

    catch{
        return {
            status: "error",
            message: "An error occurred while deleting the course"
        }

    }
}
