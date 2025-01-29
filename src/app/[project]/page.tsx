"use client";
import { usePathname } from "next/navigation";
import FilmControls from "@/components/Project/FilmControls";
import GalleryProject from "@/components/Project/GalleryProject";

export default function Page() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div id={"film"}>
      <FilmControls />
      <GalleryProject />
    </div>
  );
}
