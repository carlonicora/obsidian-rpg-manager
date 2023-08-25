import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MainV1Component from "../groups/MainV1Component";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function ClueComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	return (
		<>
			<div className="space-y-3 p-5 bg-[--background-primary-alt] border border-[--background-modifier-border]}">
				<MainV1Component element={element} isInPopover={isInPopover} />
				{isInPopover === false && element.relationships.length > 0 && (
					<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
						<RelationshipsComponent element={element} />
					</div>
				)}
			</div>
		</>
	);
}
