import { generateText } from "ai";
import { z } from "zod";
import type { ActionFunctionArgs } from "react-router";
import { model } from "~/model";

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
