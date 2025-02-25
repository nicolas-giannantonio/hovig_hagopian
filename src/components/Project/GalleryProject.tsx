"use client";
import Image from "next/image";
import { imageLoader } from "@/components/Utils/ImageTransform";
import { useEffect, useRef } from "react";
import mediumZoom from "medium-zoom";

export default function GalleryProject({
  images,
}: {
  images: [{ url: string }];
}) {
  return (
    <div className="GalleryProject">
      {images?.map((image: { url: string }, index) => (
        <div key={index} className="w_galleryProject_image">
          <ImageZoom src={image.url} />
        </div>
      ))}
    </div>
  );
}

const ImageZoom = ({ src }: { src: string }) => {
  const refImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (refImage.current) {
      mediumZoom(refImage.current, {
        margin: 56,
        background: "rgba(0, 0, 0, 0.95)",
      });
    }
  }, []);

  return (
    <Image
      sizes="(max-width: 768px) 80vw, 30vw"
      className="galleryProject_image"
      src={src}
      alt=""
      fill
      loader={imageLoader}
      ref={refImage}
    />
  );
};
