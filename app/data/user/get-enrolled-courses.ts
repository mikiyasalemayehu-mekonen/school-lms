import "server-only"
import { requireAdmin } from "../admin/require-admin"
import { prisma } from "@/lib/db";

export async function getEnrolledCourses() {
    const user = await requireAdmin();

    const data = await prisma.enrollment.findMany({
        where: {
            userId: user.user.id,
            status: "Active",
        },
        select: {
            Course: {
                select: {
                    id: true,
                    smallDescription: true,
                    title: true,
                    fileKey: true,
                    level: true,
                    slug: true,
                    duration: true,
                    chapter: {
                        select: {
                            id: true,
                            lessons: {
                                select: {
                                    id: true,

                }
            }
        },
    },
},
            },},
    });
    return data;

}
