import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;