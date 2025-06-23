import { db } from "@/db";
import { posts, authors } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getDraftPosts() {
  const results = await db.select({
    id: posts.id,
    postDate: posts.createdAt,
    title: posts.title,
    firstName: authors.firstName,
    lastName: authors.lastName,
    email: authors.email,
    category: posts.category,
    published: posts.published,
  })
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .where(eq(posts.published, false))
    .orderBy(asc(posts.createdAt));

  return results;
}
