import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import ConflictsRelationshipsListController from "../../attributes/conflict/components/ConflictsRelationshipsListController";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import SensoryImprintAttributeComponent from "../attributes/types/SensoryImprintAttributeComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import ImageComponent from "../images/ImageComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";
import UsedInListContainerComponent from "../relationships/UsedInListContainerComponent";

export default function MainV1Component({
  element,
  isInPopover,
}: {
  element: any;
  isInPopover: boolean;
}): React.ReactElement {
  return (
    <div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
      <HeaderComponent element={element} isInPopover={isInPopover} />
      <SensoryImprintAttributeComponent
        element={element}
        isEditable={!isInPopover}
      />
      <div
        className={`grid ${
          isInPopover ? "grid-cols-1" : "grid-cols-4 gap-3"
        } justify-between items-start`}
      >
        <ImageComponent element={element} isEditable={!isInPopover} />
        <div
          className={`${
            element.images.length === 0 ? "col-span-4" : "col-span-3"
          }`}
        >
          <DescriptionComponent
            element={element}
            attribute={element.attribute(AttributeType.Description)}
            isEditable={!isInPopover}
          />
        </div>
      </div>

      <ConflictsRelationshipsListController element={element} />
      <AttributeListComponent element={element} isEditable={!isInPopover} />
      {isInPopover === false && element.relationships.length > 0 && (
        <>
          <RelationshipsComponent element={element} />
          <UsedInListContainerComponent element={element} />
          <ImageCarouselComponent element={element} />
        </>
      )}
    </div>
  );
}
