"use client";
import Image from "next/image";

export default function GalleryProject({
  images,
}: {
  images: [{ url: string }];
}) {
  return (
    <div className="GalleryProject">
      {images.map((image: { url: string }, index) => (
        <Image
          key={index}
          className={"galleryProject_image"}
          width={1000}
          height={1000}
          src={image.url}
          alt=""
        />
      ))}
    </div>
  );
}
