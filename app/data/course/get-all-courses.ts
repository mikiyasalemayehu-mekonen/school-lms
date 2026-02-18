import "server-only";
import { prisma } from "@/lib/db";

export async function getAllCourses(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    const data = await prisma.course.findMany({
        where:{
            status:"PUBLISHED"
        },
         orderBy:{
            createdAt:"desc",
        },

        select :{
            title:true,
            smallDescription:true,
            price:true,
            duration:true,
            level:true,
            fileKey:true,
            slug:true,
            id:true,
            category:true
        }



    });

    return data;

}


export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];