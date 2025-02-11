import Projects from "@/components/Projects/Projects";
import { PROJECTS_QUERY } from "@/lib/queries";
import { client } from "@/lib/sanity/client";
import { extractVimeoIdAndToken, getVideoLink } from "@/lib/vimeo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const selected = await client.fetch(PROJECTS_QUERY, { projects: "clip" });
  const projects = selected[0].projects || [];

  await Promise.all(
    projects.map(
      async (project: {
        project: {
          hover_video: string;
        };
      }) => {
        const vimeoInfo = extractVimeoIdAndToken(project.project.hover_video);
        const link = await getVideoLink(vimeoInfo.videoId, vimeoInfo.token);
        project.project.hover_video = link?.play?.progressive[2].link;
      },
    ),
  );

  return (
    <div>
      <Projects data={projects} name={selected[0].title || "Selected"} />
    </div>
  );
}
