"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getAllPlaygrounds } from "~/models/playground.server";

export const loader = async () => {
  const playgrounds = await getAllPlaygrounds();
  return json({ playgrounds });
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(15).max(250),
  playgroundId: z.string().cuid(),
});

export default function NewReportPage() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const predefinedPlaygroundId = searchParams.get("playgroundId") ?? "";
  const submit = useSubmit();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      playgroundId: predefinedPlaygroundId,
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("playgroundId", values.playgroundId);
    submit(values, {
      action: "/action/new-report",
      method: "post",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="textbox" placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your report.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormDescription>What is missing or broken?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="playgroundId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playground</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={predefinedPlaygroundId ?? field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      id="playgroundSelectTrigger"
                      placeholder="Select a playground"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.playgrounds.map((playground) => (
                    <SelectItem key={playground.id} value={playground.id}>
                      {playground.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This playground will be linked to your report
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
