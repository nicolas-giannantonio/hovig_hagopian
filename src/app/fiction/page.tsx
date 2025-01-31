import Projects from "@/components/Projects/Projects";
import { PROJECTS_QUERY } from "@/lib/queries";
import { client } from "@/lib/sanity/client";

export const revalidate = 3600;

export default async function Home() {
  const selected = await client.fetch(PROJECTS_QUERY, {
    projects: "fiction",
  });
  const projects = selected[0].projects || [];

  return (
    <div>
      <Projects data={projects} name={"Fiction & Documentaries"} />
    </div>
  );
}
