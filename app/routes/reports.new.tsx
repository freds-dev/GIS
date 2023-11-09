import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createReport } from "~/models/report.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const playgroundId = formData.get("playgroundId");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          description: null,
          title: "Title is required",
          playgroundId: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json(
      {
        errors: {
          description: "Description is required",
          title: null,
          playgroundId: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof playgroundId !== "string" || playgroundId.length === 0) {
    return json(
      {
        errors: {
          description: null,
          title: null,
          playgroundId: "Playground is required",
        },
      },
      { status: 400 },
    );
  }

  const report = await createReport({
    description,
    title,
    userId,
    playgroundId,
  });

  return redirect(`/reports/${report.id}`);
};

export default function NewNReportPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const playgroundRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else if (actionData?.errors?.playgroundId) {
      playgroundRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Description: </span>
          <textarea
            ref={descriptionRef}
            name="description"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.description ? true : undefined}
            aria-errormessage={
              actionData?.errors?.description ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.description ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.description}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>PlaygroundId: </span>
          <textarea
            ref={playgroundRef}
            name="playgroundId"
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.playgroundId ? true : undefined}
            aria-errormessage={
              actionData?.errors?.playgroundId ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.playgroundId ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.playgroundId}
          </div>
        ) : null}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
