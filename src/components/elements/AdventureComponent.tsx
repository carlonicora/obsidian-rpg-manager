import * as React from "react";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import StoryCircleAttributeComponent from "../attributes/types/StoryCircleAttributeComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import HierarchyComponent from "../hierarchies/HierarchyComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import KishotenketsuComponent from "../kishotenketsu/KishotenketsuComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function AdventureComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  const storyCircle: AttributeInterface | undefined = element.attribute(
    AttributeComponentType.StoryCircle,
  );
  const kishotenketsu: AttributeInterface | undefined = element.attribute(
    AttributeType.Kishotenketsu,
  );

  return (
    <div className="flex flex-col space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border] rounded-md">
      <HeaderComponent element={element} isInPopover={isInPopover} />
      <BannerComponent element={element} />
      <DescriptionAttributeComponent
        element={element}
        attribute={element.attribute(AttributeType.Description)}
        isEditable={!isInPopover}
      />
      <AttributeListComponent element={element} isEditable={!isInPopover} />

      {kishotenketsu && kishotenketsu.isSet && (
        <div className="col-span-1 sm:col-span-1 lg:col-span-6">
          <KishotenketsuComponent
            element={element}
            attribute={kishotenketsu}
            isEditable={!isInPopover}
          />
        </div>
      )}
      {storyCircle && storyCircle.isSet && (
        <div className="col-span-1 sm:col-span-1 lg:col-span-6">
          <StoryCircleAttributeComponent
            element={element}
            attribute={storyCircle}
            isEditable={!isInPopover}
          />
        </div>
      )}
      <HierarchyComponent
        key={element.id + !isInPopover}
        element={element}
        isInPopover={isInPopover}
        type={ElementType.Chapter}
        isDraggable={!isInPopover}
      />

      {isInPopover === false && element.relationships.length > 0 && (
        <>
          <RelationshipsComponent element={element} />
          <ImageCarouselComponent element={element} />
        </>
      )}
    </div>
  );
}
