import {AbstractElement} from "../abstracts/AbstractElement";
import {ModelSelectorElementDataInterface} from "./interfaces/ModelSelectorElementDataInterface";
import {Component, MarkdownRenderer, TAbstractFile} from "obsidian";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";

export class ModelSelectorElement extends AbstractElement {
	render(
		data: ModelSelectorElementDataInterface,
		containerEl: HTMLElement,
	) {
		let selectedModel: ModelInterface|undefined = undefined;

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});

		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		const modelSelectorEl = contentEl.createEl("select");
		modelSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		data.values.list.forEach((model: ModelInterface) => {
			const sessionOptionEl = modelSelectorEl.createEl("option", {
				text: model.file.basename,
				value: model.file.path,
			});

			if (data.values.id !== undefined && data.values.id.stringID === model.id.stringID) {
				selectedModel = model;
				sessionOptionEl.selected = true;
			}

		});

		modelSelectorEl.addEventListener("change", (e) => {
			if (data.editableKey === undefined)
				return;

			const file: TAbstractFile|null = this.api.app.vault.getAbstractFileByPath(modelSelectorEl.value);

			if (file == null)
				return;

			const selectedModel: ModelInterface|undefined = this.api.database.readByPath(modelSelectorEl.value);
			if (selectedModel === undefined)
				return;

			this.api.service(CodeblockService).addOrUpdate(data.editableKey, selectedModel.id.stringID);

			this._addModelLink(selectedModel, contentEl);
		});

		if (selectedModel !== undefined)
			this._addModelLink(selectedModel, contentEl);

	}

	private _addModelLink(
		model: ModelInterface,
		containerEl: HTMLElement,
	): void {
		const linkContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content-link'});

		MarkdownRenderer.renderMarkdown(
			model.link,
			linkContainerEl,
			'',
			null as unknown as Component,
		);
	}
}
