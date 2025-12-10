import { inngest } from "./client";
import {
  Agent,
  createAgent,
  createNetwork,
  createTool,
  gemini,
  openai,
} from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import z from "zod";
import { PROMPT } from "@/prompt";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vib-next-js");
      return sandbox.sandboxId;
    });

    await step.sleep("wait-a-moment", "4s");
    const codeAgent = createAgent({ 
      name: "code-agent",
      description:"An expert coding agent",
      system: PROMPT,
      model: openai({ 
        model: "gpt-4o-mini",
        defaultParameters:{
          temperature:0.1,
        }

       }),
      tools: [
        createTool({
          name: "terminal",
          description: "Use terminal to run commands",
          parameters: z.object({
            command: z.string().describe("The command to run in the terminal."),
          }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = {
                stdout: "" as string,
                stderr: "" as string,
              };
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data:string) =>{
                    buffers.stderr += data;
                  }
                });
                return result.stdout;
              } catch (error) {
                console.error(`Command failed : ${error} \n Stdout: ${buffers.stdout} \n Stderr: ${buffers.stderr} \n `);
                return `Command failed : ${error} \n Stdout: ${buffers.stdout} \n Stderr: ${buffers.stderr} \n `;
              }
            });
          },
        }),
        createTool({
          name:"createOrUpdateFiles",
          description:"Create or update files in the sandbox",
          parameters: z.object({
            files:z.array(z.object({ path:z.string(), content:z.string()}))
          }),
          handler: async ({ files }, { step , network }) => {
            const newFiles = await step?.run("createOrUpdateFiles", async () => {
              try {
                const updatedFiles = network.state.data.files || [];
                const sandbox = await getSandbox(sandboxId);
                for(const file of files){
                  await sandbox.files.write(file.path, file.content);
                  updatedFiles[file.path] = file.content;
                }
                return updatedFiles;
              } catch (error) {
                return `Error updating files: ${error}`;
              }
            });
            if(typeof newFiles === "object"){
              network.state.data.files = newFiles;
            }
          }
        }),
        createTool({
          name:"readFiles",
          description:"Read files from the sandbox",
          parameters: z.object({
            files:z.array(z.string())
          }),
          handler: async ({ files }, { step , network }) => { 
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents= [];
                for( const file of files){
                  const content = await sandbox.files.read(file);
                  contents.push({ path:file, content});
                }
                return JSON.stringify(contents);
              } catch (error) {
                return `Error reading files: ${error}`;
              }
            });
          }
        })

      ],
      lifecycle:{
        onResponse: async ({ result , network})=>{
          const lastAssistantMessageText = lastAssistantTextMessageContent(result);
          if (lastAssistantMessageText?.includes("<task_summary>") && network) {
            network.state.data.summary = lastAssistantMessageText;
          }
         return result;
        }
      }
    });
    
    const network = createNetwork({
      name: "coding-agent-network",
      agents:[codeAgent],
      maxIter:9,
      router: async  ({ network})=>{
        const summary = network.state.data.summary as string | undefined;
        if(summary){
          return 
        }

        return codeAgent;
      }
    })
    
    const result = await network.run(event.data.value);
    const sandBoxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { 
      url: sandBoxUrl,
      title:"Fragment",
      files:result.state.data.files,
      summary:result.state.data.summary
     };
  }
);
