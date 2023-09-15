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
import TasksContainerComponent from "../tasks/TasksContainerComponent";

export default function CampaignComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	const storyCircle: AttributeInterface | undefined = element.attribute(AttributeComponentType.StoryCircle);

	return (
		<>
			<div className="space-y-3 p-5 bg-[--background-primary-alt] border border-[--background-modifier-border]">
				<HeaderComponent element={element} isInPopover={isInPopover} />
				{element.images.length > 0 && <BannerComponent image={element.images[0]} />}
				<div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 !mb-3}`}>
					<div className={`col-span-5`}>
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
				{storyCircle && storyCircle.isSet && (
					<div className="col-span-1 sm:col-span-1 lg:col-span-6">
						<StoryCircleAttributeComponent element={element} attribute={storyCircle} isEditable={!isInPopover} />
					</div>
				)}
				<HierarchyComponent
					key={element.path + ElementType.Adventure + !isInPopover}
					element={element}
					isInPopover={isInPopover}
					type={ElementType.Adventure}
					isDraggable={!isInPopover}
				/>
				<HierarchyComponent
					key={element.path + ElementType.Session + !isInPopover}
					element={element}
					isInPopover={isInPopover}
					type={ElementType.Session}
					isDraggable={!isInPopover}
				/>
				{element.images.length > 1 && (
					<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
						<ImageCarouselComponent element={element} />
					</div>
				)}
				{!isInPopover && <TasksContainerComponent element={element} />}
			</div>
		</>
	);
}
