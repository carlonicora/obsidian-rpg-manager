import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NewElementComponent from "../creation/NewElementComponent";
import OptionsViewComponent from "./OptionsViewComponent";

export default function OptionContainerComponent({
	element,
	file,
}: {
	element: ElementInterface | undefined;
	file: TFile | undefined;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const showReadme = () => {
		app.workspace.detachLeavesOfType("rpg-manager-readme");
		app.workspace.getLeaf(true).setViewState({
			type: "rpg-manager-readme",
			active: true,
		});
	};

	return (
		<div className="flex flex-col min-h-screen pb-16">
			{element && (
				<div className="mb-3">
					<h1 className="text-xl !font-bold mb-3 mt-0">{element.name}</h1>
					<OptionsViewComponent element={element} />
				</div>
			)}
			<NewElementComponent element={element} file={file} />
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3 col-span-1 text-xs">
				<div
					className="cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] pl-2 pr-2 pt-1 pb-1 border border-transparent hover:bg-[--background-primary-alt] hover:border-[--background-modifier-border] rounded-lg"
					onClick={showReadme}
				>
					{t("documentation")}
				</div>
				<div className="absolute bottom-8 left-0 right-0 pr-3 text-right text-[--text-faint] text-xs">
					{"RPG Manager" + api.version}
				</div>
			</div>
		</div>
	);
}
