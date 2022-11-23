import {AbstractElement} from "../abstracts/AbstractElement";
import {ModelSelectorElementDataInterface} from "./interfaces/ModelSelectorElementDataInterface";
import {Component, MarkdownRenderer, TAbstractFile} from "obsidian";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {SceneModel} from "../../../components/scene/models/SceneModel";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

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

			if (data.values.index !== undefined && data.values.index.id === model.index.id) {
				selectedModel = model;
				sessionOptionEl.selected = true;
			}

		});

		modelSelectorEl.addEventListener("change", (e) => {
			if (data.editableKey === undefined)
				return;

			const keyValues: Map<string, string | boolean | number | undefined> = new Map<string, string | boolean | number | undefined>();
			let previousSessionId: string | undefined = undefined;

			if (modelSelectorEl.value === ''){
				keyValues.set(data.editableKey, undefined);

				if (data.model instanceof SceneModel)
					previousSessionId = data.model.session?.index.id;
					keyValues.set('data.positionInSession', undefined);

				this.api.service(CodeblockService).addOrUpdateMultiple(keyValues);
			} else {
				const file: TAbstractFile | null = this.api.app.vault.getAbstractFileByPath(modelSelectorEl.value);

				if (file == null)
					return;

				const selectedModel: ModelInterface | undefined = this.api.database.readByPath(modelSelectorEl.value);
				if (selectedModel === undefined)
					return;

				keyValues.set(data.editableKey, selectedModel.index.id);

				if (data.model instanceof SceneModel) {
					previousSessionId = data.model.session?.index.id;
					this._addPositionInSession(selectedModel as SessionInterface, data.model, keyValues);
				}

				this.api.service(CodeblockService).addOrUpdateMultiple(keyValues);
			}

			if (previousSessionId !== undefined && previousSessionId !== modelSelectorEl.value) {
				try {
					const previousSession = this.api.database.readById<SessionInterface>(previousSessionId);
					previousSession.compactScenePositions(data.model.index.id);
				} catch (e) {
					//previous session not found, just skip
				}
			}

			this._addModelLink(contentEl, selectedModel);
		});

		if (selectedModel !== undefined)
			this._addModelLink(contentEl, selectedModel);

	}

	private _addModelLink(
		containerEl: HTMLElement,
		model?: ModelInterface,
	): void {
		if (model === undefined){
			//REMOVE
		} else {
			const linkContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-data-container-content-link'});

			MarkdownRenderer.renderMarkdown(
				model.link,
				linkContainerEl,
				'',
				null as unknown as Component,
			);
		}
	}

	private _addPositionInSession(
		session: SessionInterface,
		scene: SceneInterface,
		keyValues: Map<string, string|boolean|number|undefined>,
	): void {
		const scenes: SceneInterface[] = this.api.database.read((scene: SceneInterface) =>
			scene.index.type === ComponentType.Scene &&
			scene.session?.index.id === session.index.id
		);

		let positionInSession = 1;

		for (let index=0; index<scenes.length; index++){
			if (scenes[index].index.id === scene.index.id)
				continue;

			const scenePosition = scenes[index].positionInSession;

			if (scenePosition === undefined)
				continue;

			if (scenePosition >= positionInSession)
				positionInSession = scenePosition + 1;

		}

		keyValues.set('data.positionInSession', positionInSession);
	}
}
