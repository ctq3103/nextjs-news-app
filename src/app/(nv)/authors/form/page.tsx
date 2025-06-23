import { getAuthor } from "@/lib/queries/getAuthor";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import AuthorForm from "@/app/(nv)/authors/form/AuthorForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { authorId } = await searchParams;

  if (!authorId) return { title: "New Author" };

  return { title: `Edit Author #${authorId}` };
}

export default async function AuthorFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { getPermission } = getKindeServerSession();
    const editorPermission = await getPermission("editor");
    const isEditor = editorPermission?.isGranted;

    const { authorId } = await searchParams;

    // Edit author form
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

      return <AuthorForm key={authorId} isEditor={isEditor} author={author} />;
    } else {
      // New author form
      return <AuthorForm key="new" isEditor={isEditor} />;
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
