"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


export const Client= () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery( trpc.createAi.queryOptions({ text: "CodexVibes" }))

    return(
        <div>
            <h1>{JSON.stringify(data)}</h1>
        </div>
    )
}