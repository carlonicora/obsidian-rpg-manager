import { ElementInterface } from "@/data/interfaces/ElementInterface";
import * as React from "react";

export default function BannerComponent({
  element,
}: {
  element: ElementInterface;
}): React.ReactElement {
  if (element.images.length === 0) return null;

  return (
    <div className="flex flex-col relative w-full pb-[56.25%] overflow-hidden rounded-md">
      <img
        src={element.images[0].src}
        alt={element.images[0].caption}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}
