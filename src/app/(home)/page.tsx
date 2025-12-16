import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[20vh] 2xl:py-48">
        <div className="flex items-center gap-2 justify-center">
          <Image src="/logo.svg" alt="CoderXvibe Logo" width={24} height={24} />
          <span className="font-semibold text-lg"> CodeXVibe </span>
        </div>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectList />
    </div>
  );
}
