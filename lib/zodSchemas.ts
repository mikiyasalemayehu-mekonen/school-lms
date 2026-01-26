
import { z } from "zod";

export const level = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
  message: "Level is required",
});
export const courseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const CourseCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  fileKey: z.string().min(1, "File is required"),
  price: z.number().min(1, "Price must be a positive number"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 hour").max(500, "Duration must be at most 500 hours"),
  level: level,
  category:z.string(),
  smallDescription: z.string().min(3, "Small Description must be at least 3 characters long").max(200, "Small Description must be at most 200 characters long"),
  slug:z.string().min(3, "Slug must be at least 3 characters long"),
  status: z.enum(courseStatus,{
    message:"Status is required",
  }),
});