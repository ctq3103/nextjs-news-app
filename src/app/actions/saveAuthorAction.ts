"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { authors } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertAuthorSchema, type insertAuthorSchemaType } from "@/zod-schemas/author";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveAuthorAction = actionClient
  .metadata({ actionName: "saveAuthorAction" })
  .schema(insertAuthorSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: author }: { parsedInput: insertAuthorSchemaType }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isAuth = await isAuthenticated();

    if (!isAuth) redirect("/login");

    if (author.id === 0) {
      const result = await db
        .insert(authors)
        .values({
          firstName: author.firstName,
          lastName: author.lastName,
          email: author.email,
          bio: author.bio,
          avatarUrl: author.avatarUrl,
        })
        .returning({ insertedId: authors.id });

      return { message: `Author ID #${result[0].insertedId} created successfully` };
    }

    const result = await db
      .update(authors)
      .set({
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email,
        bio: author.bio,
        avatarUrl: author.avatarUrl,
        active: author.active,
      })
      .where(eq(authors.id, author.id!))
      .returning({ updatedId: authors.id });

    return { message: `Author ID #${result[0].updatedId} updated successfully` };
  });
