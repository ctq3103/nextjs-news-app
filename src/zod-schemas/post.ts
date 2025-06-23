import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { posts } from "@/db/schema";
import { z } from "zod";

export const insertPostSchema = createInsertSchema(posts, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.title.min(1, "Title is required"),
  slug: (schema) => schema.slug.min(1, "Slug is required"),
  content: (schema) => schema.content.min(1, "Content is required"),
  category: (schema) => schema.category.min(1, "Category is required"),
  thumbnailUrl: (schema) =>
    schema.thumbnailUrl.url("Thumbnail must be a valid URL").optional(),
});

export const selectPostSchema = createSelectSchema(posts);

export type insertPostSchemaType = typeof insertPostSchema._type;
export type selectPostSchemaType = typeof selectPostSchema._type;
