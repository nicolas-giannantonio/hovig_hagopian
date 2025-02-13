import FilmControls from "@/components/Project/FilmControls";
import GalleryProject from "@/components/Project/GalleryProject";
import { client } from "@/lib/sanity/client";
import { PROJECT_QUERY } from "@/lib/queries";
import { extractVimeoIdAndToken, getVideoLink } from "@/lib/vimeo";
import React from "react";

type PageProps = {
  params: Promise<{ project: string }>;
};

export const dynamic = "force-dynamic";

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

  const video720p =
    vimeoData?.play?.progressive.find(
      (video: { rendition: string; link: string }) =>
        video.rendition === "720p",
    ) || vimeoData?.play?.progressive[0];
  project.project.hover_video = video720p?.link;

  const filmLinkVideo = {
    hls: vimeoData?.play?.hls.link,
    mp4: video720p?.link,
  };

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
