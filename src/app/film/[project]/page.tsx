import FilmControls from "@/components/Project/FilmControls";
import GalleryProject from "@/components/Project/GalleryProject";
import { client } from "@/lib/sanity/client";
import { PROJECT_QUERY } from "@/lib/queries";
import { getVideoLink } from "@/lib/vimeo";
import React from "react";

type PageProps = {
  params: Promise<{ project: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const projectName = (await params).project;
  const data = await client.fetch(PROJECT_QUERY, { slug: projectName });
  const project = await data[0];

  let vimeoSrc = project?.vimeoSrc || "";
  let filmLinkVideo = "";
  if (vimeoSrc) {
    try {
      const vimeoData = await getVideoLink(vimeoSrc);
      filmLinkVideo = vimeoData?.play?.progressive?.[0]?.link || "";
    } catch (error) {
      console.error("Erreur lors de la récupération de la vidéo :", error);
    }
  } else {
    vimeoSrc = "";
  }
  console.log(project);
  return (
    <div id={"film"}>
      {project && (
        <React.Fragment>
          <FilmControls
            title={project.title}
            informations={project.informations}
            vimeoLink={filmLinkVideo}
          />
          <GalleryProject images={project.images} />
        </React.Fragment>
      )}
    </div>
  );
}
