
import { z } from "zod";

export const level = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export const courseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"];
export const courseCategories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const CourseCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  fileKey: z.string().min(1, "File is required"),

  price: z.coerce.number().min(1, "Price must be a positive number"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 hour").max(500, "Duration must be at most 500 hours"),
  level: z.enum(level, {
    message: "Level is required",
  }),
  category:z.enum(courseCategories,{
    message:"Category is required",
  }),
  smallDescription: z.string().min(3, "Small Description must be at least 3 characters long").max(200, "Small Description must be at most 200 characters long"),
  slug:z.string().min(3, "Slug must be at least 3 characters long"),
  status: z.enum(courseStatus,{
    message:"Status is required",
  }),
});

export const ChapterSchema = z.object(
  {
    name:z.string().min(3,{message:"Name Must be atleast 3 characters long."}),
    courseId:z.string().uuid({
      message:"Invalid course Id"


    }),


  }
)
export const lessonSchema = z.object({
  name:z.string().min(3, {message:"Name Must be atleast 3 characters long."}),
  chapterId:z.string().uuid({
    message:"Invalid chapter Id"


  }),
  courseId:z.string().uuid({
    message:"Invalid course Id"
  }),
  desciption:z.string().min(3, {message:"Description Must be atleast 3 characters long."}).optional(),
  thumbnailKey:z.string().optional( ),
  videoKey:z.string().optional( ),

})
export type CourseSchemaType = z.infer<typeof CourseCreateSchema>;
export type ChapterSchemaType = z.infer<typeof ChapterSchema>;
export type lessonSchemaType = z.infer<typeof lessonSchema>;