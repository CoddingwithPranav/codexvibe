import { inngest } from "./client";
import { Agent , createAgent , gemini, openai} from "@inngest/agent-kit";
import { Sandbox } from '@e2b/code-interpreter'
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vib-next-js");
      return sandbox.sandboxId;
    }
  )

    await step.sleep("wait-a-moment", "4s");
     const writer = createAgent({
      name: "writer",
      system: "You are an expert writer.  You write readable, concise, simple content.",
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await writer.run("Write a tweet on how AI works");
    console.log("Generated tweet:", output);


    const  sandBoxUrl =  await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host =  sandbox.getHost(3000);
      return `https://${host}`;
    }
  )

    return { url : sandBoxUrl };
  },
);