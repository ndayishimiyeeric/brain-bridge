import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }).optional(),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long",
  }).optional(),
  imageUrl: z.string().url().optional(),
  categoryId: z.string().uuid().optional(),
  price: z.coerce.number().optional(),
})

export type UpdateCourseSchemaType = z.infer<typeof UpdateCourseSchema>;

export const CreateChapterSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export type CreateChapterSchemaType = z.infer<typeof CreateChapterSchema>;