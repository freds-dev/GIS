import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

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
          playgroundId: "playgroundId is required",
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

  return redirect(`/dashboard/reports/${report.id}`);
};
