"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertPostSchema, type insertPostSchemaType } from "@/zod-schemas/post";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const savePostAction = actionClient
  .metadata({ actionName: "savePostAction" })
  .schema(insertPostSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: post }: { parsedInput: insertPostSchemaType }) => {
    const { isAuthenticated } = getKindeServerSession();
    const isAuth = await isAuthenticated();

    if (!isAuth) redirect("/login");

    // New post
    if (post.id === "(New)") {
      const result = await db.insert(posts).values({
        authorId: post.authorId,
        title: post.title,
        slug: post.slug,
        content: post.content,
        published: post.published,
        category: post.category,
        thumbnailUrl: post.thumbnailUrl,
      }).returning({ insertedId: posts.id });

      return { message: `Post ID #${result[0].insertedId} created successfully` };
    }

    // Update post
    const result = await db.update(posts)
      .set({
        authorId: post.authorId,
        title: post.title,
        slug: post.slug,
        content: post.content,
        published: post.published,
        category: post.category,
        thumbnailUrl: post.thumbnailUrl,
      })
      .where(eq(posts.id, post.id!))
      .returning({ updatedId: posts.id });

    return { message: `Post ID #${result[0].updatedId} updated successfully` };
  });
