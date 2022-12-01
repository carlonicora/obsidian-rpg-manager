import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IndexInterface} from "../../indexService/interfaces/IndexInterface";
import {WizardDataInterface} from "../../../managers/modalsManager/interfaces/WizardDataInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {LinkSuggesterService} from "../../linkSuggesterService/LinkSuggesterService";
import {Component, MarkdownRenderer} from "obsidian";

export abstract class AbstractStepModal implements WizardPartInterface {
	protected information: WizardDataInterface;
	protected descriptionEl: HTMLTextAreaElement;

	constructor(
		protected api: RpgManagerApiInterface,
		protected adventureId: IndexInterface,
		public title: string,
		protected subtitle: string,
		protected description: string,
		protected existingDescription?: string,
		protected supportingPart?: WizardPartInterface,
	) {
		console.log(supportingPart);
	}

	protected get adventure(): AdventureInterface {
		return this.api.database.readById(this.adventureId.id);
	}

	public get data(): WizardDataInterface|undefined {
		return this.information;
	}

	public get synopsis(): string {
		return this.information?.description ?? this.existingDescription ?? '';
	}

	protected getContainer(
		containerEl: HTMLDivElement,
		containsClues: boolean,
	) : HTMLDivElement {
		containerEl.createEl('h2', {cls: 'rpg-manager-wizard-main-content-header', text: this.title});
		containerEl.createEl('h3', {cls: 'rpg-manager-wizard-main-content-header', text: this.subtitle});
		containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-title', text: this.description});

		const dataContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container clearfix'});

		const descriptionContainerEl = dataContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-' + (containsClues ? 'clues-' : '') + 'text'});
		this.descriptionEl = descriptionContainerEl.createEl('textarea', {
			cls: 'rpg-manager-wizard-main-content-container-textarea',
			text: this.synopsis
		});

		if (this.supportingPart !== undefined){
			const supportingEl = descriptionContainerEl.createDiv();
			supportingEl.createEl('h3', {cls: 'rpg-manager-wizard-main-content-header', text: this.supportingPart.title});

			const supportingDescriptionEl: HTMLDivElement = supportingEl.createDiv('rpg-manager-wizard-main-supporting-content');
			MarkdownRenderer.renderMarkdown(
				this.supportingPart.synopsis,
				supportingDescriptionEl,
				'',
				null as unknown as Component,
			);
		}

		this.api.service(LinkSuggesterService).createHandler(this.descriptionEl, this.adventure);


		return dataContainerEl;
	}

	abstract render(
		containerEl: HTMLDivElement,
		supportingPart?: WizardPartInterface,
	): Promise<void>;

	abstract save(
	): Promise<void>;
}
