"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import {
  insertPostSchema,
  type insertPostSchemaType,
  type selectPostSchemaType,
} from "@/zod-schemas/post"
import { selectAuthorSchemaType } from "@/zod-schemas/author"

import { useAction } from "next-safe-action/hooks"
import { savePostAction } from "@/app/actions/savePostAction"
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
  author: selectAuthorSchemaType,
  post?: selectPostSchemaType,
  categories?: {
    id: string,
    description: string,
  }[],
  isEditable?: boolean,
  isEditor?: boolean | undefined
}

export default function PostForm({
  author,
  post,
  categories,
  isEditable = true,
 // isEditor = false
}: Props) {

  const { toast } = useToast()

  const defaultValues: insertPostSchemaType = {
    id: post?.id ?? "(New)",
    authorId: post?.authorId ?? author.id,
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    content: post?.content ?? '',
    published: post?.published ?? false,
    category: post?.category ?? 'general',
    thumbnailUrl: post?.thumbnailUrl ?? '',
  }

  const form = useForm<insertPostSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertPostSchema),
    defaultValues,
  })

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(savePostAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data.message,
        })
      }
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save Failed",
      })
    }
  })

  async function submitForm(data: insertPostSchemaType) {
    executeSave(data)
  }

  return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-background rounded-xl shadow-md border border-border">
  <div className="mb-6">
    <h2 className="text-3xl font-semibold tracking-tight text-foreground">
      {post?.id && isEditable
        ? `Edit Post #${post.id}`
        : post?.id
        ? `View Post #${post.id}`
        : "New Post Form"}
    </h2>
    <p className="text-sm text-muted-foreground mt-1">
      {isEditable ? "Create or update a post" : "View only mode"}
    </p>
  </div>

  <DisplayServerActionResponse result={saveResult} />

  <Form {...form}>
    <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6 text-forground">
      <InputWithLabel<insertPostSchemaType>
        fieldTitle="Title"
        nameInSchema="title"
        disabled={!isEditable}
      />

      <InputWithLabel<insertPostSchemaType>
        fieldTitle="Slug"
        nameInSchema="slug"
        disabled={!isEditable}
      />

      <InputWithLabel<insertPostSchemaType>
        fieldTitle="Thumbnail URL"
        nameInSchema="thumbnailUrl"
        disabled={!isEditable}
      />

      <SelectWithLabel<insertPostSchemaType>
        fieldTitle="Category"
        nameInSchema="category"
        data={
          categories
            ? categories
            : [
                { id: "general", description: "General" },
                { id: "tech", description: "Tech" },
                { id: "lifestyle", description: "Lifestyle" },
              ]
        }
        disabled={!isEditable}
      />

      {post?.id && (
        <CheckboxWithLabel<insertPostSchemaType>
          fieldTitle="Published"
          nameInSchema="published"
          message="Yes"
          disabled={!isEditable}
        />
      )}

      <TextAreaWithLabel<insertPostSchemaType>
        fieldTitle="Content"
        nameInSchema="content"
        className="h-96"
        disabled={!isEditable}
      />

      <div className="space-y-2 pt-4">
        <h3 className="text-lg font-medium text-foreground">Author Info</h3>
        <hr className="border-border" />
        <p className="text-foreground font-medium">{author.firstName} {author.lastName}</p>
        <p className="text-muted-foreground text-sm">{author.email}</p>
        {author.avatarUrl && (
          <img
            src={author.avatarUrl}
            alt="avatar"
            className="h-12 w-12 rounded-full mt-2"
          />
        )}
        <p className="text-muted-foreground text-sm mt-2">{author.bio}</p>
      </div>

      {isEditable && (
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1"
            variant="default"
            title="Save"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <LoaderCircle className="animate-spin mr-2" /> Saving
              </>
            ) : (
              "Save"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            title="Reset"
            onClick={() => {
              form.reset(defaultValues)
              resetSaveAction()
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </form>
  </Form>
</div>

  )
}
