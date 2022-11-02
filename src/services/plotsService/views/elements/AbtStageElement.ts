import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {AbtStageElementDataInterface} from "./interfaces/AbtStageElementDataInterface";
import {AbtStage} from "../../enums/AbtStage";
import {CodeblockService} from "../../../codeblockService/CodeblockService";
import {PlotService} from "../../PlotService";

export class AbtStageElement extends AbstractElement {
	render(
		data: AbtStageElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const abtSelectorEl = contentEl.createEl("select");
		abtSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		Object.keys(AbtStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const abtOptionEl = abtSelectorEl.createEl("option", {
				text: type,
				value: type,
			});

			if (data.values !== undefined && data.values === this.api.service(PlotService).getAbtStage(type))
				abtOptionEl.selected = true;
		});

		abtSelectorEl.addEventListener("change", (e) => {
			if (data.editableKey !== undefined)
				this.api.service(CodeblockService).addOrUpdate(
					data.editableKey,
					abtSelectorEl.value.toLowerCase(),
				);

		});
	}
}
