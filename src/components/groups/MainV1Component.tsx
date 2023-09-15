import { ElementType } from "@/data/enums/ElementType";
import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import OgasAttributeComponent from "../attributes/types/OgasAttributeComponent";
import SensoryImprintAttributeComponent from "../attributes/types/SensoryImprintAttributeComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import ImageComponent from "../images/ImageComponent";
import TasksContainerComponent from "../tasks/TasksContainerComponent";

export default function MainV1Component({
	element,
	isInPopover,
}: {
	element: any;
	isInPopover: boolean;
}): React.ReactElement {
	return (
		<>
			<HeaderComponent element={element} isInPopover={isInPopover} />
			{element.attribute(AttributeType.SensoryImprint) && (
				<SensoryImprintAttributeComponent
					element={element}
					attribute={element.attribute(AttributeType.SensoryImprint)}
					isEditable={!isInPopover}
				/>
			)}
			<div className={`gap-3 !mb-3 grid grid-cols-1 ${isInPopover ? "" : "sm:grid-cols-1 lg:grid-cols-5"}`}>
				<div className={`grid ${isInPopover ? "grid-cols-1" : "lg:col-span-5 lg:grid-cols-5"} gap-3`}>
					{element.images.length > 0 && (
						<div
							className={`${
								isInPopover ? "col-span-1" : "lg:col-span-2"
							} rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary]`}
						>
							<ImageComponent element={element} isEditable={!isInPopover} />
						</div>
					)}
					<div
						className={`${
							isInPopover ? "col-span-1" : element.images.length > 0 ? "lg:col-span-3" : "lg:col-span-5"
						} rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] !mt-0`}
					>
						<DescriptionAttributeComponent
							element={element}
							attribute={element.attribute(AttributeType.Description)}
							isEditable={!isInPopover}
						/>
						{element.type === ElementType.NonPlayerCharacter && <OgasAttributeComponent element={element} />}
					</div>
					<div className={`col-span-1 ${!isInPopover && "lg:col-span-5"}`}>
						<AttributeListComponent element={element} isEditable={!isInPopover} />
					</div>
				</div>
			</div>
			{element.images.length > 0 && (
				<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
					<ImageCarouselComponent element={element} />
				</div>
			)}
			{!isInPopover && <TasksContainerComponent element={element} />}
		</>
	);
}
