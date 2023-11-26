import { AttributeType } from "@/data/enums/AttributeType";
import * as React from "react";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import DurationAttributeComponent from "../attributes/types/DurationAttributeComponent";
import ParentAttributeComponent from "../attributes/types/ParentAttributeComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import ImageComponent from "../images/ImageComponent";
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
				{element.images.length > 0 && (
					<div className="max-h-32 h-32 overflow-hidden">
						<ImageComponent element={element} isEditable={!isInPopover} />
					</div>
				)}
				<div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 !mb-3}`}>
					<div className={`col-span-5 sm:col-span-1 lg:col-span-5`}>
						<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 !mb-3">
							<DescriptionAttributeComponent
								element={element}
								attribute={element.attribute(AttributeType.Description)}
								isEditable={!isInPopover}
							/>
							<ParentAttributeComponent element={element} isEditable={!isInPopover} />
						</div>
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
