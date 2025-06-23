import { db } from "@/db";
import { posts, authors } from "@/db/schema";
import { eq, ilike, or, sql, asc } from "drizzle-orm";

export async function getPostSearchResults(searchText: string) {
  const results = await db.select({
    id: posts.id,
    postDate: posts.createdAt,
    title: posts.title,
    slug: posts.slug,
    category: posts.category,
    published: posts.published,
    firstName: authors.firstName,
    lastName: authors.lastName,
    email: authors.email,
  })
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .where(or(
      ilike(posts.title, `%${searchText}%`),
      ilike(posts.slug, `%${searchText}%`),
      ilike(posts.category, `%${searchText}%`),
      ilike(authors.email, `%${searchText}%`),
      ilike(authors.bio, `%${searchText}%`),
      sql`lower(concat(${authors.firstName}, ' ', ${authors.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`
    ))
    .orderBy(asc(posts.createdAt));

  return results;
}

export type PostSearchResultsType = Awaited<ReturnType<typeof getPostSearchResults>>;
