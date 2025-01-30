import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import type { ActionFunctionArgs } from "react-router";

const model = anthropic("claude-3-5-sonnet-latest");

const schema = z.object({
  prompt: z.string(),
});

export async function loader() {
  throw new Response("Method not allowed", {
    status: 405,
    statusText: "Method Not Allowed",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();

  console.log(body);

  const { success, data } = schema.safeParse(body);

  if (!success) {
    return new Response("Missing prompt", { status: 400 });
  }

  const prompt = data.prompt;

  const { text } = await generateText({
    model,
    prompt,
  });

  return Response.json({
    text,
  });
}
