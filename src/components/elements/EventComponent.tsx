import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AttributeListComponent from "../attributes/AttributeListComponent";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import BannerComponent from "../headers/BannerComponent";
import HeaderComponent from "../headers/HeaderComponent";
import ImageCarouselComponent from "../images/ImageCarouselComponent";
import OptionsComponent from "../options/OptionsComponent";
import RelationshipsComponent from "../relationships/RelationshipsComponent";
import TasksContainerComponent from "../tasks/TasksContainerComponent";

export default function EventComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	return (
		<>
			<div className="space-y-3 p-5 bg-[--background-primary-alt] border border-[--background-modifier-border]">
				<HeaderComponent element={element} isInPopover={isInPopover} />
				{element.images.length > 0 && <BannerComponent image={element.images[0]} />}
				<div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-3 !mb-3}`}>
					<div
						className={`${
							isInPopover ? "col-span-6 sm:col-span-1 lg:col-span-6" : "col-span-5 sm:col-span-1 lg:col-span-5"
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

					{isInPopover === false && <OptionsComponent element={element} />}
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
