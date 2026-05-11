import Image, { ImageProps } from "next/image";
import React from "react";

// A tiny transparent PNG as fallback
const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+X2ZkAAAAASUVORK5CYII=";

interface BlurImageProps extends Omit<ImageProps, "placeholder"> {
  blurDataURL?: string;
}

const BlurImage = React.forwardRef<HTMLImageElement, BlurImageProps>(
  ({ blurDataURL, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        placeholder="blur"
        blurDataURL={blurDataURL || DEFAULT_BLUR_DATA_URL}
        {...props}
        alt={props.alt || "blur-image"}
      />
    );
  }
);

BlurImage.displayName = "BlurImage";

export default BlurImage;
