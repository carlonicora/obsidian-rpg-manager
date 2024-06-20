import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ConflictAttributeComponent from "../../attributes/conflict/components/ConflictComponent";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function ConflictComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  return (
    <div className="flex flex-col space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border] rounded-md">
      <HeaderComponent element={element} isInPopover={isInPopover} />
      <BannerComponent element={element} />
      <DescriptionComponent
        element={element}
        attribute={element.attribute(AttributeType.Description)}
        isEditable={!isInPopover}
      />
      {element.attribute(AttributeType.Conflict) &&
        element.attribute(AttributeType.Conflict).isSet && (
          <ConflictAttributeComponent
            element={element}
            isEditable={!isInPopover}
            attribute={element.attribute(AttributeType.Conflict)}
          />
        )}
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
