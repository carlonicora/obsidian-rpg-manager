import { AttributeType } from "@/data/enums/AttributeType";
import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import SensoryImprintAttributeComponent from "../attributes/types/SensoryImprintAttributeComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import ImageComponent from "../images/ImageComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function SceneComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  return (
    <div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
      <HeaderComponent element={element} isInPopover={isInPopover} />
      <SensoryImprintAttributeComponent
        element={element}
        isEditable={!isInPopover}
      />
      <div className="flex flex-row justify-between items-start">
        <ImageComponent element={element} isEditable={!isInPopover} />
        <DescriptionComponent
          element={element}
          attribute={element.attribute(AttributeType.Description)}
          isEditable={!isInPopover}
        />
      </div>

      <AttributeListComponent element={element} isEditable={!isInPopover} />

      {isInPopover === false && element.relationships.length > 0 && (
        <>
          <RelationshipsComponent element={element} />
          <ImageCarouselComponent element={element} />
        </>
      )}
    </div>
  );
}
