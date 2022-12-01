import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";
import {AbstractStepModal} from "../../abstracts/AbstractStepModal";
import {Component, MarkdownRenderer} from "obsidian";

export class StepIntroductionModal extends AbstractStepModal implements WizardPartInterface {
	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
		containerEl.createEl('h2', {cls: 'rpg-manager-wizard-main-content-header', text: this.title});
		containerEl.createEl('h3', {cls: 'rpg-manager-wizard-main-content-header', text: this.subtitle});
		const introductionEl: HTMLDivElement = containerEl.createDiv();

		MarkdownRenderer.renderMarkdown(
			this.description,
			introductionEl,
			'',
			null as unknown as Component,
		);
	}

	public async save(
	): Promise<void> {
	}
}
