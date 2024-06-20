import { AttributeType } from "@/data/enums/AttributeType";
import { ElementType } from "@/data/enums/ElementType";
import { SystemType } from "@/data/enums/SystemType";
import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ConflictsRelationshipsListController from "../../attributes/conflict/components/ConflictsRelationshipsListController";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import SensoryImprintAttributeComponent from "../attributes/types/SensoryImprintAttributeComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import ImageComponent from "../images/ImageComponent";
import OgasComponent from "../ogas/components/OgasComponent";
import RawStatsComponent from "../raw/stats/RawStatsComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";
import UsedInListContainerComponent from "../relationships/UsedInListContainerComponent";

export default function NonPlayerCharacterComponent({
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
      {element.type === ElementType.NonPlayerCharacter && (
        <OgasComponent element={element} />
      )}

      {element.system === SystemType.RAW && (
        <RawStatsComponent element={element} />
      )}

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
