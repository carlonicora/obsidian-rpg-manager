import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "src/hooks/useApi";
import { useApp } from "src/hooks/useApp";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";
import OptionsViewComponent from "./OptionsViewComponent";

export default function OptionContainerComponent({
	element,
	file,
}: {
	element: Element | undefined;
	file: TFile | undefined;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RPGManager = useApi();
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
					<h1 className="text-xl !font-bold mb-3">{element.name}</h1>
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
