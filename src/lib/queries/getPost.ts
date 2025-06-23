import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getPost(id: number) {
    const post = await db.select()
        .from(posts)
        .where(eq(posts.id, id))

    return post[0]
}