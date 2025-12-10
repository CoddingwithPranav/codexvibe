import { inngest } from "./client";
import { Agent , createAgent , gemini, openai} from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "4s");
     const writer = createAgent({
      name: "writer",
      system: "You are an expert writer.  You write readable, concise, simple content.",
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await writer.run("Write a tweet on how AI works");
    console.log("Generated tweet:", output);
    return { message: output };
  },
);