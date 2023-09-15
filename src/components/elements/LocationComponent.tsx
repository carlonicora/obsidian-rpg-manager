import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MainV1Component from "../groups/MainV1Component";

export default function LocationComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	return (
		<>
			<div className="space-y-3 p-3 bg-[--background-primary-alt] border border-[--background-modifier-border]">
				<MainV1Component element={element} isInPopover={isInPopover} />
			</div>
		</>
	);
}
