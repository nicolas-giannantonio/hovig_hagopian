"use client";
import Zoom from "react-medium-image-zoom";

export default function GalleryProject({
  images,
}: {
  images: [{ url: string }];
}) {
  return (
    <div className="GalleryProject">
      {images?.map((image: { url: string }, index) => (
        <div key={index} className="w_galleryProject_image">
          <Zoom>
            <img className="galleryProject_image" src={image.url} alt="" />
          </Zoom>
        </div>
      ))}
    </div>
  );
}
