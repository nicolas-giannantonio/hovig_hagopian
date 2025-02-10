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

const extractVimeoIdAndToken = (url: string) => {
  if (!url) {
    console.warn("URL Vimeo est absente ou invalide.");
    return null;
  }

  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (match) {
    const videoId = match[1] || "";
    const token = match[2] || "";
    return { videoId, token };
  }

  return {
    videoId: "",
    token: "",
  };
};

export default async function Page({ params }: PageProps) {
  const projectName = (await params).project;
  const data = await client.fetch(PROJECT_QUERY, { slug: projectName });
  const project = await data[0];

  const extractVimeoUrl = extractVimeoIdAndToken(project?.vimeoSrc) as {
    videoId: string;
    token: string;
  };

  const vimeoData = await getVideoLink(
    extractVimeoUrl.videoId,
    extractVimeoUrl.token,
  );

  const filmLinkVideo = vimeoData?.play?.hls.link;

  return (
    <div id={"film"}>
      {project && (
        <React.Fragment>
          <FilmControls
            title={project.title}
            informations={project.informations}
            vimeoLink={filmLinkVideo}
            coverImageUrl={project.coverImageUrl}
          />
          <GalleryProject images={project.images} />
        </React.Fragment>
      )}
    </div>
  );
}
