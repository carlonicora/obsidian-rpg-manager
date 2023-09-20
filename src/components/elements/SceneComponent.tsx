import * as React from "react";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DurationAttributeComponent from "../attributes/types/DurationAttributeComponent";
import ImageAndDescriptionComponent from "../groups/ImageAndDescriptionComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";
import TasksContainerComponent from "../tasks/TasksContainerComponent";

export default function SceneComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	const attribute: AttributeInterface = element.attribute(AttributeComponentType.Duration);

	return (
		<>
			<div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
				<HeaderComponent element={element} isInPopover={isInPopover} />
				<div className={`gap-3 !mb-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5`}>
					<div className={`lg:col-span-2`}>
						<ImageAndDescriptionComponent
							element={element}
							isInPopover={isInPopover}
							requiresImage={false}
							showParent={true}
						/>
					</div>
					<div className={`lg:col-span-3`}>
						<AttributeListComponent element={element} isEditable={!isInPopover} />
					</div>
				</div>
				<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
					<DurationAttributeComponent element={element} attribute={attribute} isEditable={!isInPopover} />
				</div>
				{element.images.length > 1 && (
					<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
						<ImageCarouselComponent element={element} />
					</div>
				)}
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
