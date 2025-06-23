import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Authors Table
export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// Posts Table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => authors.id),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique().notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  category: varchar("category").notNull().default("general"),
  thumbnailUrl: varchar("thumbnail_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

// Relations
export const authorsRelations = relations(authors, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(authors, {
    fields: [posts.authorId],
    references: [authors.id],
  }),
}));
