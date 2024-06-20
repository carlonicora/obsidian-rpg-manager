import { AttributeComponentType } from "@/data/enums/AttributeComponentType";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ConflictsRelationshipsListController from "../../attributes/conflict/components/ConflictsRelationshipsListController";
import DescriptionComponent from "../../attributes/description/components/DescriptionComponent";
import AttributeListComponent from "../attributes/AttributeListComponent";
import ParentAttributeComponent from "../attributes/types/ParentAttributeComponent";
import StoryCircleAttributeComponent from "../attributes/types/StoryCircleAttributeComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import KishotenketsuComponent from "../kishotenketsu/KishotenketsuComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function ChapterComponent({
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
    <>
      <div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
        <HeaderComponent element={element} isInPopover={isInPopover} />
        <BannerComponent element={element} />
        <div
          className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 !mb-3}`}
        >
          <div className={`col-span-5 sm:col-span-1 lg:col-span-5`}>
            <div className="rounded-md border border-[--background-modifier-border] bg-[--background-primary] p-3 !mb-3">
              <DescriptionComponent
                element={element}
                attribute={element.attribute(AttributeType.Description)}
                isEditable={!isInPopover}
              />
              <ParentAttributeComponent
                element={element}
                isEditable={!isInPopover}
              />
            </div>
            <ConflictsRelationshipsListController element={element} />
            <AttributeListComponent
              element={element}
              isEditable={!isInPopover}
            />
          </div>
        </div>
        {element.images.length > 1 && (
          <div className="rounded-md border border-[--background-modifier-border] bg-[--background-primary] p-3">
            <ImageCarouselComponent element={element} />
          </div>
        )}
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
        {isInPopover === false && element.relationships.length > 0 && (
          <div className="rounded-md border border-[--background-modifier-border] bg-[--background-primary] p-3">
            <RelationshipsComponent element={element} />
          </div>
        )}
      </div>
    </>
  );
}
