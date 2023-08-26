import { RpgManagerInterface } from "@/RpgManagerInterface";
import { useApi } from "@/hooks/useApi";
import { TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function TemplateSelectionComponent({
	setTemplate,
}: {
	setTemplate: (value: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	if (!api.settings.templatesFolder) return null;

	const templates: TFile[] = app.vault
		.getFiles()
		.filter((file: TFile) => file.parent.path === api.settings.templatesFolder && file.extension === "md");

	if (templates.length === 0) return null;

	return (
		<div className="max-w-md mb-3">
			<div className="font-bold">{t("create.select", { context: "template" })}</div>
			<select onChange={(e) => setTemplate(e.target.value)} className="w-full">
				<option value=""></option>
				{templates.map((template: TFile) => (
					<option key={template.path} value={template.path}>
						{template.basename}
					</option>
				))}
			</select>
		</div>
	);
}
