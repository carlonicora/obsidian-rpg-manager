import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MainV1Component from "../groups/MainV1Component";
import HeaderComponent from "../headers/HeaderComponent";
import BannerComponent from "../headers/BannerComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import { AttributeType } from "@/data/enums/AttributeType";
import AttributeListComponent from "../attributes/AttributeListComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import HierarchyComponent from "../hierarchies/HierarchyComponent";
import TasksContainerComponent from "../tasks/TasksContainerComponent";
import ConflictComponent from "../conflict/ConflictComponent";
import KishotenketsuComponent from "../kishotenketsu/KishotenketsuComponent";
import StoryCircleAttributeComponent from "../attributes/types/StoryCircleAttributeComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { AttributeComponentType } from "@/data/enums/AttributeComponentType";
import { ElementType } from "@/data/enums/ElementType";

export default function LoreComponent({
    element,
    isInPopover,
}: {
    element: ElementInterface;
    isInPopover: boolean;
}): React.ReactElement {
    
    const storyCircle: AttributeInterface | undefined = element.attribute(AttributeComponentType.StoryCircle);
    const kishotenketsu: AttributeInterface | undefined = element.attribute(AttributeType.Kishotenketsu);
    const conflict: AttributeInterface | undefined = element.attribute(AttributeType.Conflict);
    
    return (
        <>
            <div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
                <HeaderComponent element={element} isInPopover={isInPopover} />
                {element.images.length > 0 && <BannerComponent image={element.images[0]} />}
                <div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 !mb-3}`}>
                    <div
                        className={`${isInPopover ? "col-span-5 sm:col-span-1 lg:col-span-5" : "col-span-5 sm:col-span-1 lg:col-span-5"
                            }`}
                    >
                        <div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 !mb-3">
                            <DescriptionAttributeComponent
                                element={element}
                                attribute={element.attribute(AttributeType.Description)}
                                isEditable={!isInPopover}
                            />
                        </div>
                        <AttributeListComponent element={element} isEditable={!isInPopover} />
                    </div>
                </div>
                {element.images.length > 1 && (
                    <div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
                        <ImageCarouselComponent element={element} />
                    </div>
                )}
                {conflict && conflict.isSet && (
                    <div className="col-span-1 sm:col-span-1 lg:col-span-6">
                        <ConflictComponent element={element} attribute={conflict} isEditable={!isInPopover} />
                    </div>
                )}
                {kishotenketsu && kishotenketsu.isSet && (
                    <div className="col-span-1 sm:col-span-1 lg:col-span-6">
                        <KishotenketsuComponent element={element} attribute={kishotenketsu} isEditable={!isInPopover} />
                    </div>
                )}
                {storyCircle && storyCircle.isSet && (
                    <div className="col-span-1 sm:col-span-1 lg:col-span-6">
                        <StoryCircleAttributeComponent element={element} attribute={storyCircle} isEditable={!isInPopover} />
                    </div>
                )}
                <HierarchyComponent
                    key={element.path + !isInPopover}
                    element={element}
                    isInPopover={isInPopover}
                    type={ElementType.Lore}
                    isDraggable={!isInPopover}
                />
                <HierarchyComponent
                    key={element.path + !isInPopover}
                    element={element}
                    isInPopover={isInPopover}
                    type={ElementType.Chapter}
                    isDraggable={!isInPopover}
                />
                
                {!isInPopover && <TasksContainerComponent element={element} />}
                {isInPopover === false && element.relationships.length > 0 && (
                    <div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
                        <RelationshipsComponent element={element} />
                    </div>
                )}
            </div>
        </>
    );
}
