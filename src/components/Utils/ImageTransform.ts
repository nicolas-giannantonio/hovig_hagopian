const imageLoader = ({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  return `${src}?w=${width}&q=${100}&fm=webp`;
};

export { imageLoader };
