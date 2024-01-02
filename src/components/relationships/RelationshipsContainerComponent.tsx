import { RpgManagerInterface } from "@/RpgManagerInterface";
import { useApi } from "@/hooks/useApi";
import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import RelationshipsComponent from "./RelationshipsComponent";

export default function RelationshipsContainerComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const api: RpgManagerInterface = useApi();

	if (!api.settings.showRelationships[element.type]) return null;
	if (element.relationshipsToDisplay.length === 0) return null;

	return (
		<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
			<RelationshipsComponent element={element} />
		</div>
	);
}
