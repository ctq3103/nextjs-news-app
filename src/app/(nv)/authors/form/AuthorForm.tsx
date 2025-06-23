"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";

import {
  insertAuthorSchema,
  type insertAuthorSchemaType,
  type selectAuthorSchemaType,
} from "@/zod-schemas/author";

import { useAction } from "next-safe-action/hooks";
import { saveAuthorAction } from "@/app/actions/saveAuthorAction";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  author?: selectAuthorSchemaType;
  isEditor?: boolean | undefined;
};

export default function AuthorForm({ author, isEditor = false }: Props) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const hasAuthorId = searchParams.has("authorId");

  const emptyValues: insertAuthorSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    bio: "",
    active: true,
  };

  const defaultValues: insertAuthorSchemaType = hasAuthorId
    ? {
        id: author?.id ?? 0,
        firstName: author?.firstName ?? "",
        lastName: author?.lastName ?? "",
        email: author?.email ?? "",
        avatarUrl: author?.avatarUrl ?? "",
        bio: author?.bio ?? "",
        active: author?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertAuthorSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertAuthorSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasAuthorId ? defaultValues : emptyValues);
  }, [searchParams.get("authorId")]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveAuthorAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data.message,
        });
      }
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save Failed",
      });
    },
  });

  async function submitForm(data: insertAuthorSchemaType) {
    executeSave(data);
  }

  return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-background rounded-xl shadow-md border border-border">
  <div className="mb-6">
    <h2 className="text-3xl font-semibold tracking-tight text-foreground">
      {author?.id ? "Edit" : "New"} Author {author?.id ? `#${author.id}` : ""}
    </h2>
    <p className="text-sm text-muted-foreground mt-1">
      Manage author details used across posts.
    </p>
  </div>

  <DisplayServerActionResponse result={saveResult} />

  <Form {...form}>
    <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6 text-foreground">
      <InputWithLabel<insertAuthorSchemaType>
        fieldTitle="First Name"
        nameInSchema="firstName"
      />

      <InputWithLabel<insertAuthorSchemaType>
        fieldTitle="Last Name"
        nameInSchema="lastName"
      />

      <InputWithLabel<insertAuthorSchemaType>
        fieldTitle="Email"
        nameInSchema="email"
      />

      <InputWithLabel<insertAuthorSchemaType>
        fieldTitle="Avatar URL"
        nameInSchema="avatarUrl"
      />

      <TextAreaWithLabel<insertAuthorSchemaType>
        fieldTitle="Bio"
        nameInSchema="bio"
        className="h-40"
      />

      {isEditor && author?.id && (
        <CheckboxWithLabel<insertAuthorSchemaType>
          fieldTitle="Active"
          nameInSchema="active"
          message="Yes"
        />
      )}

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
            form.reset(defaultValues);
            resetSaveAction();
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  </Form>
</div>

  );
}
