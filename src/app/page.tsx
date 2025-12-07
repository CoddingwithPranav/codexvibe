import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "./client";

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAi.queryOptions({ text: "CodexVibes" }));
  const  data  = await caller.createAi({ text: "Hello, world!" });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
       <Client/>
      </Suspense>
      </HydrationBoundary>
  );
}
