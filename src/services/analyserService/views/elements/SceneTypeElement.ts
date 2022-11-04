import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {SceneTypeElementDataInterface} from "./interfaces/SceneTypeElementDataInterface";
import {SceneTypeDescriptionModal} from "../../../../components/scene/modals/SceneTypeDescriptionModal";
import {SceneType, sceneTypeDescription} from "../../enums/SceneType";
import {CodeblockService} from "../../../codeblockService/CodeblockService";

export class SceneTypeElement extends AbstractElement {
	render(
		data: SceneTypeElementDataInterface,
		containerEl: HTMLElement,
	) {
		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});
		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});

		const sceneTypeSelectorEl = contentEl.createEl("select");


		contentEl.createSpan({text: '?'}).addEventListener('click', () => {
			new SceneTypeDescriptionModal(this.api).open();
		});

		sceneTypeSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		Object.keys(SceneType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const sceneTypeOptionEl = sceneTypeSelectorEl.createEl("option", {
				text: sceneTypeDescription.get(SceneType[type as keyof typeof SceneType]) ?? type,
				value: type,
			});

			if (data.values !== undefined && data.values === SceneType[type as keyof typeof SceneType])
				sceneTypeOptionEl.selected = true;

		});

		sceneTypeSelectorEl.addEventListener("change", (e) => {
			if (data.editableKey !== undefined)
				this.api.service(CodeblockService).addOrUpdate(
					data.editableKey,
					sceneTypeSelectorEl.value,
				);

		});
	}
}
