import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
import Image from "next/image";


export default function Page() {
  

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image 
             src="/logo.svg"
             alt="CoderXvibe Logo"
             width={50}
             height={50}
             className="hidden md:block"
             />
        </div>
        <h1 className="text-2xl md:text-5xl  font-bold text-center">
           Build Something with CodeXVibe
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create your first project to get started with CodeXVibe. Explore the
          features and unleash your creativity!
        </p>
        <div className="max-w-3xl mx-auto w-full">
            <ProjectForm/>
        </div>
      </section>
      <ProjectList />

    </div>
  );
}
