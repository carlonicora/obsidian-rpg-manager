import {Component, MarkdownRenderer} from "obsidian";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import i18next from "i18next";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

interface SceneTypeInformation {
	title: string,
	description: string,
	isActive: boolean,
}

export class SceneTypeDescriptionModal extends AbstractModal {
	private _sceneTypeDescriptionsEl: HTMLDivElement;

	private _sceneTypeDescription: SceneTypeInformation[];

	constructor(
		api: RpgManagerApiInterface
	) {
		super(api);

		this._sceneTypeDescription = [
			{
				title: i18next.t("action") ?? '',
				description: i18next.t("action_description") ?? '',
				isActive: true
			},
			{
				title: i18next.t("combat") ?? '',
				description: i18next.t("combat_description") ?? '',
				isActive: true
			},
			{
				title: i18next.t("encounter") ?? '',
				description: i18next.t("encounter_description") ?? '',
				isActive: false
			},
			{
				title: i18next.t("exposition") ?? '',
				description: i18next.t("exposition_description") ?? '',
				isActive: false
			},
			{
				title: i18next.t("investigation") ?? '',
				description: i18next.t("investigation_description") ?? '',
				isActive: true
			},
			{
				title: i18next.t("planning") ?? '',
				description: i18next.t("planning_description") ?? '',
				isActive: false
			},
			{
				title: i18next.t("preparation") ?? '',
				description: i18next.t("preparation_description") ?? '',
				isActive: false
			},
			{
				title: i18next.t("recap") ?? '',
				description: i18next.t("recap_description") ?? '',
				isActive: false
			},
			{
				title: i18next.t("social_combat") ?? '',
				description: i18next.t("social_combat_description") ?? '',
				isActive: true
			},
		];
	}

	onOpen() {
		super.onOpen();
		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		this._sceneTypeDescriptionsEl = contentEl.createDiv({cls: 'rpgm-modal-scene-descriptions'});
		this._sceneTypeDescriptionsEl.createEl('h1', {text: i18next.t("scene_types") ?? ''});

		this._sceneTypeDescription.forEach((sceneTypeInformation: SceneTypeInformation) => {
			this._displaySceneTypeInformation(sceneTypeInformation);
		});
	}

	private _displaySceneTypeInformation(
		sceneTypeInformation: SceneTypeInformation,
	): void {
		const descriptionContainerEl = this._sceneTypeDescriptionsEl.createDiv('description-container');
		descriptionContainerEl.createEl('h2', {text: sceneTypeInformation.title});

		const descriptionEl = descriptionContainerEl.createDiv();
		descriptionContainerEl.createSpan({text: i18next.t("scene_active", {context: sceneTypeInformation.isActive.toString()}) ?? ''});

		MarkdownRenderer.renderMarkdown(
			sceneTypeInformation.description,
			descriptionEl,
			'',
			null as unknown as Component,
		);
	}

	onClose() {
		super.onClose();
	}
}
