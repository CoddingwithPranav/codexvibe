"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default  function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess:(data)=>{
      toast.success("Project Created Successfully");
      router.push(`/projects/${data.id}`);
    }
  }));

  return (
    <div className="h-screen w-screen flex items-center justify-center  bg-lime-500">
      <div className="max-w-7xl  h-12 mx-auto flex items-center flex-col gap-4 justify-center ">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled={createProject.isPending} onClick={()=>{createProject.mutate({value:value})}} variant="default">Submit</Button>

</div>
     <div>
     </div>
    </div>
  );
}
