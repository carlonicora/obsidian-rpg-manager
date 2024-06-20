import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import * as React from "react";

export default function RelationshipGridElementComponent({
  element,
  relationship,
}: {
  element: ElementInterface;
  relationship: RelationshipInterface;
}): React.ReactElement {
  return (
    <div className="w-full relative border border-[--background-modifier-border] rounded-md leading-none overflow-hidden">
      {relationship.component.images.length > 0 ? (
        <>
          <img
            src={relationship.component.images[0].src}
            alt={relationship.component.images[0].caption}
            className="min-w-full min-h-full object-cover block transition-opacity duration-300 aspect-square"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 text-white transition-opacity duration-300 opacity-0 hover:bg-opacity-50 hover:opacity-100 text-center">
            <div className="text-[--text-opacity] !text-2xl">
              <a
                href={relationship.component.file.path}
                className="internal-link !cursor-pointer !no-underline !text-white uppercase !font-light"
              >
                {relationship.component.name}
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center aspect-square">
          <div className="text-[--text-opacity]">
            <a
              href={relationship.component.file.path}
              className="internal-link !cursor-pointer !no-underline uppercase !font-light"
            >
              {relationship.component.name}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
