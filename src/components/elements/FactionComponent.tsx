import { ElementType } from "@/data/enums/ElementType";
import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";
import MainV1Component from "../groups/MainV1Component";
import RelationshipsComponent from "../relationships/RelationshipsComponent";

export default function FactionComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	const initialValue = `**bold** _italic_ *italic* **bold**
[[Campaigns/Æther/Æther.md|Æther]]
[[Campaigns/Æther/Æther.md]]

# h1
## h2
### h3

- list1
- list2

1. list1
2. list2
`;

	const [value, setValue] = React.useState<string>(initialValue);

	return (
		<>
			<div className="mb-3">
				<MarkdownEditorComponent
					initialValue={value}
					campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign?.path}
					onChange={setValue}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
				/>
			</div>
			<div className="space-y-3 p-5 bg-[--background-primary-alt] border border-[--background-modifier-border]">
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
