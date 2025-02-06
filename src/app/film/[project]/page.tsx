import FilmControls from "@/components/Project/FilmControls";
import GalleryProject from "@/components/Project/GalleryProject";
import { client } from "@/lib/sanity/client";
import { PROJECT_QUERY } from "@/lib/queries";
import { getVideoLink } from "@/lib/vimeo";

type PageProps = {
  params: Promise<{ project: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const projectName = (await params).project;
  const data = await client.fetch(PROJECT_QUERY, { slug: projectName });
  const project = await data[0];

  const vimeoData = await getVideoLink(project.vimeoSrc);
  const filmLinkVideo = vimeoData.play.progressive[0].link;

  return (
    <div id={"film"}>
      <FilmControls
        title={project.title}
        src={project.src}
        informations={project.informations}
        vimeoLink={filmLinkVideo}
      />
      <GalleryProject images={project.images} />
    </div>
  );
}
