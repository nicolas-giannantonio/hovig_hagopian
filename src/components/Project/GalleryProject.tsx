export default function GalleryProject({
  images,
}: {
  images: [{ url: string }];
}) {
  return (
    <div className="GalleryProject">
      {images?.map((image: { url: string }, index) => (
        <div key={index} className="w_galleryProject_image">
          <img
            className="galleryProject_image"
            src={image.url}
            alt="qsldkfjqdlskjf"
          />
        </div>
      ))}
    </div>
  );
}
