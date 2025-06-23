import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { authors } from "@/db/schema";

export const insertAuthorSchema = createInsertSchema(authors, {
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is required"),
  email: (schema) => schema.email.email("Invalid email address"),
  bio: (schema) => schema.bio.optional(),
  avatarUrl: (schema) => schema.avatarUrl.url("Invalid URL").optional(),
});

export const selectAuthorSchema = createSelectSchema(authors);

export type insertAuthorSchemaType = typeof insertAuthorSchema._type;
export type selectAuthorSchemaType = typeof selectAuthorSchema._type;
