import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetEnrollmentStats() {
    await requireAdmin();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enrollments = await prisma.enrollment.findMany({
      where: {
        CreatedAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        CreatedAt: true,
    },
    orderBy: {
      CreatedAt: "asc",
    },
  });

  const last30Days: {date:string; enrollments: number}[] = [];

  for(let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateString = date.toISOString().split("T")[0];
    const count = enrollments.filter(e => e.CreatedAt.toISOString().split("T")[0] === dateString).length;
    last30Days.push({date: dateString, enrollments: count});
  }
  enrollments.forEach(enrollment => {
    const enrollmentDate = enrollment.CreatedAt.toISOString().split("T")[0];
    const dayIndex = last30Days.findIndex(d => d.date === enrollmentDate);
    if(dayIndex !== -1) {
      last30Days[dayIndex].enrollments += 1;
    }
  });
  return last30Days;
}
