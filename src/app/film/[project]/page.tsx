import FilmControls from "@/components/Project/FilmControls";
import GalleryProject from "@/components/Project/GalleryProject";
import { client } from "@/lib/sanity/client";
import { PROJECT_QUERY } from "@/lib/queries";

type PageProps = {
  params: Promise<{ project: string }>;
};

export default async function Page({ params }: PageProps) {
  const projectName = (await params).project;
  const data = await client.fetch(PROJECT_QUERY, { slug: projectName });
  const project = data[0];

  return (
    <div id={"film"}>
      <FilmControls
        title={project.title}
        src={project.src}
        informations={project.informations}
      />
      <GalleryProject images={project.images} />
    </div>
  );
}
