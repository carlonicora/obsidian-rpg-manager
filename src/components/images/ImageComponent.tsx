// import { useApp } from "@/hooks/useApp";
// import { App } from "obsidian";
import * as React from "react";
// import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
// import { useApi } from "src/hooks/useApi";

export default function ImageComponent({
  element,
  isEditable,
}: {
  element: ElementInterface;
  isEditable: boolean;
}): React.ReactElement {
  if (element.images.length === 0) return null;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  // const api: RpgManagerInterface = useApi();
  // const app: App = useApp();

  const goPrev = () => {
    if (currentIndex === 0) setCurrentIndex(element.images.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex === element.images.length - 1) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);
  };

  // const handleDragOver = (event: React.DragEvent) => {
  //   event.preventDefault();
  // };
  // const handleFileDrop = (event: React.DragEvent) => {
  //   event.preventDefault();
  //   const fileUpload = new FileUploadService(app, api);
  //   fileUpload.uploadFileList(element, event.dataTransfer.files);
  // };

  return (
    <div className="aspect-square w-full leading-none overflow-hidden relative border border-[--background-modifier-border] rounded-md">
      <img
        src={element.images[currentIndex].src}
        alt={element.images[currentIndex].caption}
        className="min-w-full min-h-full object-cover block aspect-square"
      />
      {element.images.length > 1 && (
        <>
          <div
            onClick={goPrev}
            className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-start hover:bg-gradient-to-r hover:from-black hover:to-transparent hover:opacity-100 opacity-0"
          >
            <span className="text-[--text-faint] text-6xl ml-2">&lt;</span>
          </div>
          <div
            onClick={goNext}
            className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-end hover:bg-gradient-to-l hover:from-black hover:to-transparent hover:opacity-100 opacity-0"
          >
            <span className="text-[--text-faint] text-6xl mr-2">&gt;</span>
          </div>
        </>
      )}
    </div>
  );
}
