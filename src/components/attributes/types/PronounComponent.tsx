import { RpgManagerInterface } from "@/RpgManagerInterface";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import AttributeTitleComponent from "../AttributeTitleComponent";

export default function PronounComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	function removeAttribute(): void {
		codeblockService.updateCodeblockData(attribute.id, undefined);
	}

	const saveAttribute = (newValue: string) => {
		codeblockService.updateCodeblockData(attribute.id, newValue);
	};

	let content;

	if (isEditable) {
		content = (
			<div className="grid grid-cols-1 lg:grid-cols-2 group">
				<div>
					<select
						defaultValue={attribute.value}
						onChange={(e) => saveAttribute(e.target.value)}
						className="!pl-2 !pr-4"
					>
						<option value=""></option>
						<option value="they">They / Them / Themself</option>
						<option value="she">She / Her / Herself</option>
						<option value="st">She / They / Themself</option>
						<option value="he">He / Him / Himself</option>
						<option value="ht">He / They / Themself</option>
						<option value="it">It / Its / Itself</option>
						<option value="ae">(f)Ae / (f)Aer / (f)Aerself</option>
						<option value="e">E(Ey) / Em / Eirelf</option>
						<option value="per">Per / Per / Perself</option>
						<option value="ve">Ve / Ver / Verself</option>
						<option value="xe">Xe / Xem / Xemself"</option>
						<option value="ze">Ze(Zie) / Hir / Hirself</option>
					</select>
				</div>
				<div className="flex justify-end !ml-3">
					<button className="rpgm-danger opacity-0 group-hover:opacity-100" onClick={removeAttribute}>
						{t("buttons.delete")}
					</button>
				</div>
			</div>
		);
	} else {
		let value = "";
		switch (attribute.value) {
			case "they":
				value = "They / Them / Themself";
				break;
			case "she":
				value = "She / Her / Herself";
				break;
			case "st":
				value = "She / They / Themself";
				break;
			case "he":
				value = "He / Him / Himself";
				break;
			case "ht":
				value = "He / They / Themself";
				break;
			case "it":
				value = "It / Its / Itself";
				break;
			case "ae":
				value = "(f)Ae / (f)Aer / (f)Aerself";
				break;
			case "e":
				value = "E(Ey) / Em / Eirelf";
				break;
			case "per":
				value = "Per / Per / Perself";
				break;
			case "ve":
				value = "Ve / Ver / Verself";
				break;
			case "xe":
				value = "Xe / Xem / Xemself";
				break;
			case "ze":
				value = "Ze(Zie) / Hir / Hirself";
				break;
		}
		content = <div>{value}</div>;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4">
			<AttributeTitleComponent attribute={attribute} />
			<div className="col-span-3 pl-0 lg:pl-3">{content}</div>
		</div>
	);
}
