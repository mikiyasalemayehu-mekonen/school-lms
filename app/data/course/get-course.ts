import "server-only";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getIndividualCourse(slug:string){
    const course  = await prisma.course.findUnique({
        where:{
            slug:slug
        },
        select:{
            id:true,
            title:true,
            smallDescription:true,
            price:true,
            duration:true,
            level:true,
            fileKey:true,
            slug:true,
            category:true,
            description:true,
            chapter:{
                select:{
                    id:true,
                    title:true,
                    lessons:{
                        select: {
                            id:true,
                            title:true,

                        },
                         orderBy:{
                            position:"asc"
                     },

                    }
                },
                orderBy:{
                    Position:"asc",
                }
            },

        }
    });
    if (!course) return notFound();
    return course;



}