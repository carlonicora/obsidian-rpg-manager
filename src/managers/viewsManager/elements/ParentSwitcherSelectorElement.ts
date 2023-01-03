import {AbstractElement} from "../abstracts/AbstractElement";
import {ModelSelectorElementDataInterface} from "./interfaces/ModelSelectorElementDataInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {v4 as uuidv4} from "uuid";

export class ParentSwitcherSelectorElement extends AbstractElement {
	private _id: string;

	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super(api);
		this._id = uuidv4();
	}

	render(
		data: ModelSelectorElementDataInterface,
		containerEl: HTMLElement,
	) {
		let selectedModel: ModelInterface|undefined = undefined;

		const infoEl = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container rpg-manager-header-container-info-data-container-short clearfix'});

		this.createTitle(data.model, data.title, infoEl);

		const contentEl = infoEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content clearfix'});
		const modelSelectorEl = contentEl.createEl("select");

		data.values.list.forEach((model: ModelInterface) => {
			const sessionOptionEl = modelSelectorEl.createEl("option", {
				text: model.file.basename,
				value: model.file.path,
			});

			if (data.values.index !== undefined && data.values.index.parentId === model.index.id) {
				selectedModel = model;
				sessionOptionEl.selected = true;
			}
		});

		modelSelectorEl.addEventListener("change", (e) => {
			const selectedModel: ModelInterface | undefined = this.api.database.readByPath(modelSelectorEl.value);

			if (selectedModel === undefined)
				return;

			const existingChildrenInParent: ModelInterface[] = this.api.database.readChildren<ModelInterface>(data.model.index.type, selectedModel.index.id).sort(
				this.api.service(SorterService).create<ActInterface>([
					new SorterComparisonElement((act: ActInterface) =>  act.index.positionInParent, SorterType.Descending),
				])
			);

			let positionInParent = 1;
			if (existingChildrenInParent.length > 0)
				positionInParent = existingChildrenInParent[0].index.positionInParent + 1;

			const keyValues: Map<string, string|number|boolean|undefined> = new Map<string, string | number | boolean | undefined>();
			keyValues.set('parentId', selectedModel.index.id);
			keyValues.set('positionInParent', positionInParent);

			this.api.service(CodeblockService).addOrUpdateMultipleInIndex(keyValues);

			this._addModelLink(contentEl, selectedModel);
		});

		if (selectedModel !== undefined)
			this._addModelLink(contentEl, selectedModel);

	}

	private _addModelLink(
		containerEl: HTMLElement,
		model?: ModelInterface,
	): void {
		const previousContainer: HTMLElement|null = document.getElementById(this._id);
		if (previousContainer != undefined)
			previousContainer.remove();

		if (model !== undefined){
			const linkContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content-link'});
			linkContainerEl.id = this._id;

			MarkdownRenderer.renderMarkdown(
				model.link,
				linkContainerEl,
				'',
				null as unknown as Component,
			);
		}
	}
}
