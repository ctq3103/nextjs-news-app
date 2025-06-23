import { getAuthor } from "@/lib/queries/getAuthor";
import { getPost } from "@/lib/queries/getPost";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import PostForm from "@/app/(nv)/posts/form/PostForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { authorId, postId } = await searchParams;

  if (!authorId && !postId) {
    return {
      title: "Missing Post ID or Author ID",
    };
  }

  if (authorId) {
    return {
      title: `New Post for Author #${authorId}`,
    };
  }

  if (postId) {
    return {
      title: `Edit Post #${postId}`,
    };
  }
}

export default async function PostFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { authorId, postId } = await searchParams;

    if (!authorId && !postId) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h2 className="text-2xl mb-4 text-foreground">
            Post ID or Author ID required to load post form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </div>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [editorPermission, user] = await Promise.all([
      getPermission("editor"),
      getUser(),
    ]);
    const isEditor = editorPermission?.isGranted;

    // New post form
    if (authorId) {
      const author = await getAuthor(parseInt(authorId));

      if (!author) {
        return (
          <>
            <h2 className="text-2xl mb-2">Author ID #{authorId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!author.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">Author ID #{authorId} is not active.</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // return post form
      if (isEditor) {
        kindeInit();
        const { users } = await Users.getUsers();

        const categories = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : [];

        return (
          <PostForm
            author={author}
            categories={categories}
            isEditor={isEditor}
          />
        );
      } else {
        return <PostForm author={author} />;
      }
    }

    // Edit post form
    if (postId) {
      const post = await getPost(parseInt(postId));

      if (!post) {
        return (
          <>
            <h2 className="text-2xl mb-2">Post ID #{postId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const author = await getAuthor(post.authorId);

      if (isEditor) {
        kindeInit();
        const { users } = await Users.getUsers();

        const categories = users
          ? users
              .filter((user): user is { email: string } => typeof user.email === "string")
              .map((user) => ({
                id: user.email.toLowerCase(),
                description: user.email.toLowerCase(),
              }))
          : [];

        return (
          <PostForm
            author={author}
            post={post}
            categories={categories}
            isEditor={isEditor}
          />
        );
      } else {
        const isEditable =
          post &&
          user!.email?.toLowerCase() === post.category.toLowerCase();

        return <PostForm author={author} post={post} isEditable={isEditable} />;
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
