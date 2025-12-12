"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessagesContainer } from "../components/message-container";
import { Fragment, Suspense, useState } from "react";
import { fragment } from "@/generated/prisma/client";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment , setActiveFragment] = useState<fragment | null>(null);
   
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction={"horizontal"}>
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<div>Loading Project...</div>}>
             <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<div>Loading Messages...</div>}>
            <MessagesContainer 
            projectId={projectId} 
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
             />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          {
            !!activeFragment &&  <FragmentWeb data={activeFragment}/>
          }
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
