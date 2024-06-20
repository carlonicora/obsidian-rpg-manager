import * as React from "react";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ConflictsRelationshipsListController from "../../attributes/conflict/components/ConflictsRelationshipsListController";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import StoryCircleAttributeComponent from "../attributes/types/StoryCircleAttributeComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import HierarchyComponent from "../hierarchies/HierarchyComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";

export default function CampaignComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  const storyCircle: AttributeInterface | undefined = element.attribute(
    AttributeComponentType.StoryCircle,
  );

  return (
    <>
      <div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
        <HeaderComponent element={element} isInPopover={isInPopover} />
        <BannerComponent element={element} />
        <DescriptionComponent
          element={element}
          attribute={element.attribute(AttributeType.Description)}
          isEditable={!isInPopover}
        />
        <ConflictsRelationshipsListController element={element} />
        <AttributeListComponent element={element} isEditable={!isInPopover} />
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
          key={element.id + ElementType.Adventure + !isInPopover}
          element={element}
          isInPopover={isInPopover}
          type={ElementType.Adventure}
          isDraggable={!isInPopover}
        />
        <HierarchyComponent
          key={element.id + ElementType.Session + !isInPopover}
          element={element}
          isInPopover={isInPopover}
          type={ElementType.Session}
          isDraggable={!isInPopover}
        />
        {element.images.length > 1 && (
          <div className="rounded-md border border-[--background-modifier-border] bg-[--background-primary] p-3">
            <ImageCarouselComponent element={element} />
          </div>
        )}
      </div>
    </>
  );
}
