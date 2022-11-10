import {AbstractStepModal} from "../../abstracts/AbstractStepModal";
import {WizardPartInterface} from "../../../../managers/modalsManager/interfaces/WizardPartInterface";
import {LinkSuggesterService} from "../../../linkSuggesterService/LinkSuggesterService";

export class StepDescriptionAndCluesModal extends AbstractStepModal implements WizardPartInterface {
	private _clueTitleEl: HTMLInputElement;
	private _clueDescriptionEl: HTMLTextAreaElement;
	private _leadContainerEl: HTMLDivElement;
	private _leadItems: HTMLInputElement[];

	public async render(
		containerEl: HTMLDivElement,
	): Promise<void> {
		const dataContainerEl: HTMLDivElement = super.getContainer(containerEl, true);

		const cluesContainerEl: HTMLDivElement = dataContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-clues'});
		cluesContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-clues-title-container rpg-manager-wizard-main-content-container-clues-title', text: 'Clue'});
		this._clueTitleEl = cluesContainerEl.createEl('input', {cls: 'rpg-manager-wizard-main-content-container-clues-title-input', type: 'text', placeholder: 'Title of the clue', value: this.information?.clue?.name ?? ''});
		this._clueDescriptionEl = cluesContainerEl.createEl('textarea', {
			cls: 'rpg-manager-wizard-main-content-container-clues-title-description',
			text: this.information?.clue?.description ?? '',
		});
		this._clueDescriptionEl.placeholder = 'Synopsis of the clue';
		this.api.service(LinkSuggesterService).createHandler(this._clueDescriptionEl, this.adventure);
		cluesContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-clues-lead-container-title rpg-manager-wizard-main-content-container-clues-title', text: 'Where can the clue be found?'});

		this._leadItems = [];
		this._leadContainerEl = cluesContainerEl.createDiv({cls: 'rpg-manager-wizard-main-content-container-clues-lead-container'});

		if (this.information?.clue?.leads !== undefined && this.information.clue.leads.length > 0)
			for (let index=0; index<this.information.clue.leads.length; index++)
				if (this.information.clue.leads[index] !== '')
					this._addLeadEl(this.information.clue.leads[index]);

		this._addLeadEl();
	}

	public async save(
	): Promise<void> {
		this.information = {
			description: this.descriptionEl.value,
			clue: {
				name: this._clueTitleEl.value,
				description: this._clueDescriptionEl.value,
				leads: [],
			}
		};

		for (let index=0; index<this._leadItems.length; index++)
			if (this._leadItems[index].value !== '')
				this.information.clue?.leads?.push(this._leadItems[index].value);

	}

	private _addLeadEl(
		selectedElement?: string,
	): void {
		const leadItemEl: HTMLInputElement = this._leadContainerEl.createEl('input', {cls: 'rpg-manager-wizard-main-content-container-clues-lead-item', type: 'text', placeholder: 'Add an npc or a location', value: selectedElement ?? ''});
		this.api.service(LinkSuggesterService).createSimplifiedHandler(leadItemEl, this.adventure);

		leadItemEl.addEventListener('input', () => {
			if (leadItemEl.value !== '' && !this._isThereAnEmptyLeadEl)
				this._addLeadEl();

		});

		this._leadItems.push(leadItemEl);
	}

	private get _isThereAnEmptyLeadEl(): boolean {
		for (let index=0; index<this._leadItems.length; index++) {
			if (this._leadItems[index].value === '')
				return true;

		}

		return false;
	}
}

