"use client";
import Image from "next/image";
import { imageLoader } from "@/components/Utils/ImageTransform";

export default function GalleryProject({
  images,
}: {
  images: [{ url: string }];
}) {
  return (
    <div className="GalleryProject">
      {images?.map((image: { url: string }, index) => (
        <div key={index} className="w_galleryProject_image">
          <Image
            fill
            sizes="(max-width: 768px) 40vw, 27vw"
            className="galleryProject_image"
            src={image.url}
            alt=""
            loader={imageLoader}
          />
        </div>
      ))}
    </div>
  );
}
