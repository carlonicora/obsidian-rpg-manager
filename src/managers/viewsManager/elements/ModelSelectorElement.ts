import {AbstractElement} from "../abstracts/AbstractElement";
import {ModelSelectorElementDataInterface} from "./interfaces/ModelSelectorElementDataInterface";
import {Component, MarkdownRenderer, TAbstractFile} from "obsidian";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {SceneModel} from "../../../components/scene/models/SceneModel";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SessionModel} from "../../../components/session/models/SessionModel";

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

			const file: TAbstractFile|null = this.api.app.vault.getAbstractFileByPath(modelSelectorEl.value);

			if (file == null)
				return;

			let previousSessionId: string|undefined = undefined;

			const selectedModel: ModelInterface|undefined = this.api.database.readByPath(modelSelectorEl.value);
			if (selectedModel === undefined)
				return;

			const keyValues: Map<string, string|boolean|number|undefined> = new Map<string, string | boolean | number | undefined>();
			keyValues.set(data.editableKey, selectedModel.index.id);

			if (data.model instanceof SceneModel) {
				previousSessionId = data.model.session?.index.id;
				this._addPositionInSession(selectedModel as SessionInterface, data.model, keyValues);
			}

			this.api.service(CodeblockService).addOrUpdateMultiple(keyValues);

			if (previousSessionId !== undefined && previousSessionId !== selectedModel.index.id){
				try {
					const previousSession = this.api.database.readById<SessionInterface>(previousSessionId);
					previousSession.compactScenePositions(data.model.index.id);
				} catch (e) {
					//previous session not found, just skip
				}
			}

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
