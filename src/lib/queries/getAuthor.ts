import { db } from "@/db"
import { authors } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getAuthor(id: number) {
    const author = await db.select()
        .from(authors)
        .where(eq(authors.id, id))

    return author[0]
}