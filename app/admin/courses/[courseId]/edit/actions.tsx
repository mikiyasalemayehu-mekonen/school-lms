"use server"

import { requireAdmin } from "@/app/data/admin/require-admin"
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { chapterSchema, chapterSchemaType, CourseCreateSchema,CourseSchemaType } from "@/lib/zodSchemas";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
    detectBot(
        {
        mode:"LIVE",
        allow:[],

    }
    )

).withRule(
    fixedWindow({
        mode:"LIVE",
        window:"1m",
        max:5,
    })
);
export async function editCourse(data:CourseSchemaType,courseId:string): Promise<ApiResponse>{
    const user  = await requireAdmin();


    try{
          const req = await request();
        const decision = await aj.protect(req,{
            fingerprint:user.user.id,

        });
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
        const result =  CourseCreateSchema.safeParse(data)
        if(!result.success){
            return {
                status:"error",
                message:"Invalid data sent"
            }
        }
        await prisma.course.update({
            where:{
                id:courseId,
                userId:user.user.id,
            },
            data:{
                ...result.data,
            }
        });
        return {
            status:"success",
            message:"Course updated successfully"
        }

    }
    catch{
        return {
            status:"error",
            message:"Failed To update the course"
        }

    }
}

export async function reorderLessons(
    chapterId:string,
    lessons: {id:string; position:number}[],
    courseId:string
): Promise<ApiResponse>{
    await requireAdmin();
    try{
        if (!lessons || lessons.length ===0){
            return {
                status:"error",
                message:"No lessons provided"

        };

    }
    const updates = lessons.map((lesson)=>
        prisma.lesson.update({
        where:{
            id:lesson.id,
            chapterId:chapterId,

        },
        data:{
            position:lesson.position,
        }
    }));
    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit` )
    return {
        status:"success",
        message:"Lessons reordered successfully"
    }
 }
    catch{
        return {
            status:"error",
            message:"Failed to reorder lessons"
        }

    }

}

export async function reorderChapters(courseId:string,chapters: {id:string; position:number}[]) :Promise<ApiResponse> {
    try{
        if (!chapters || chapters.length ===0){
            return {
                status:"error",
                message:"No chapters provided"
            };
        }
        const updates = chapters.map((chapter)=>
        prisma.chapter.update({
        where:{
            id:chapter.id,
            courseId:courseId,

        },
        data:{
            Position:chapter.position,
        }
    }));
    await prisma.$transaction(updates);
    revalidatePath(`/admin/courses/${courseId}/edit`)
    return {
        status:"success",
        message:"Chapters reordered successfully"
    }

    } catch{
        return {
            status:"error",
            message:"Failed to reorder chapters"
        }

    }

}

export async function createChapter(values:chapterSchemaType): Promise<ApiResponse>{
    await requireAdmin();
    try {
        const result = chapterSchema.safeParse(values);
        if (!result.success){
            return {
                status:"error",
                message:"Invalid data sent"
            };
        }
        await prisma.$transaction(async(tx)=>{
            const maxPos = await tx.chapter.findFirst({
                where:{courseId:values.courseId},
                orderBy:{Position:'desc'},
                select:{Position:true},
            });
            await tx.chapter.create({
                data:{
                    title:result.data.name,
                    courseId:result.data.courseId,
                    Position:maxPos ? maxPos.Position + 1 : 1,
                }
            });

        });
        revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
        return {
            status:"success",
            message:"Chapter created successfully"
        };
        }

    catch{
        return {
            status:"error",
            message:"Failed to create chapter"
        }
    }
}