import * as React from "react";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import DescriptionAttributeComponent from "../attributes/types/DescriptionAttributeComponent";
import ParentAttributeComponent from "../attributes/types/ParentAttributeComponent";
import ImageComponent from "../images/ImageComponent";

export default function ImageAndDescriptionComponent({
	element,
	isInPopover,
	requiresImage,
	showParent,
}: {
	element: ElementInterface;
	isInPopover: boolean;
	requiresImage: boolean;
	showParent?: boolean;
}): React.ReactElement {
	const hasImages: boolean = element.images.length > 0;

	return (
		<>
			{(requiresImage || hasImages) && (
				<div className="rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3">
					<ImageComponent element={element} isEditable={!isInPopover} />
				</div>
			)}

			<div className="rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary]">
				<DescriptionAttributeComponent
					element={element}
					attribute={element.attribute(AttributeType.Description)}
					isEditable={!isInPopover}
				/>
				{showParent && <ParentAttributeComponent element={element} isEditable={!isInPopover} />}
			</div>
		</>
	);
}
