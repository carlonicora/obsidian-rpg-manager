import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import * as React from "react";
import NewElementComponent from "../creation/NewElementComponent";
import OptionsViewComponent from "./OptionsViewComponent";

export default function OptionContainerComponent({
	element,
}: {
	element: ElementInterface | undefined;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();

	return (
		<div className="flex flex-col min-h-screen pb-16">
			{element && (
				<div className="mb-3">
					<h1 className="text-xl !font-bold mb-3">{element.name}</h1>
					<OptionsViewComponent element={element} />
				</div>
			)}
			<NewElementComponent element={element} />
			<div className="absolute bottom-8 left-0 right-0 pr-3 text-right text-[--text-faint] text-xs">
				{"RPG Manager" + api.version}
			</div>
		</div>
	);
}
