import { db } from "@/db";
import { authors } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getAuthorSearchResults(searchText: string) {
  const results = await db.select()
    .from(authors)
    .where(or(
      ilike(authors.email, `%${searchText}%`),
      ilike(authors.bio, `%${searchText}%`),
      sql`lower(concat(${authors.firstName}, ' ', ${authors.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`,
    ))
    .orderBy(authors.lastName);
    
  return results;
}
