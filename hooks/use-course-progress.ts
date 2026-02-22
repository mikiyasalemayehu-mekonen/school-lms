import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { useMemo } from "react";

interface iAppProps{
    courseData:CourseSidebarDataType["course"];
}

export function useCourseProgress({courseData}:iAppProps){
    return useMemo(() => {
        let totalLessons = 0;
        let completedLessons = 0;

        courseData.chapter.forEach((chapter) => {
            chapter.lessons.forEach((lesson) => {
                totalLessons++;
                const isCompleted = lesson.LessonProgress.some((progress) =>progress.lessonId === lesson.id && progress.completed);

                if (isCompleted) {
                    completedLessons++;
                }
            });
        });

        return {
            totalLessons,
            completedLessons,
            progress: totalLessons > 0 ? (completedLessons / totalLessons * 100) : 0
        };
    }, [courseData]);
}

