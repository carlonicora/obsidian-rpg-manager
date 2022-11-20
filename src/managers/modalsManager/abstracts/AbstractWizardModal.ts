import {Modal, Scope} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {WizardPartInterface} from "../interfaces/WizardPartInterface";
import {WizardNavigationPartInterface} from "../interfaces/WizardNavigationPartInterface";
import {NavigationPart} from "../parts/NavigationPart";
import {WizardDataClueInterface} from "../interfaces/WizardDataClueInterface";

export abstract class AbstractWizardModal extends Modal {
	protected steps: number;
	protected isInitialised: boolean;

	private _currentStep: number;

	private _currentPartInterface: WizardPartInterface;

	private _navigationPart: WizardNavigationPartInterface;

	private _wizardHeaderEl: HTMLDivElement;
	private _wizardNavigationEl: HTMLDivElement;
	private _wizardRecapEl: HTMLDivElement;
	private _wizardContentEl: HTMLDivElement;
	private _wizardButtonEl: HTMLDivElement;

	private _backButtonEl: HTMLButtonElement;
	private _nextButtonEl: HTMLButtonElement;

	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super(api.app);

		this.scope = new Scope();

		this.scope.register([], "Escape", evt => {
			evt.preventDefault();
		});

		this._currentStep = 0;
		this.isInitialised = false;
	}

	open() {
		super.open();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpg-manager-modal');

		this.modalEl.style.width = 'var(--modal-max-width)';

		const wizardEl: HTMLDivElement = contentEl.createDiv({cls: 'rpg-manager-modal-wizard'});

		this._wizardHeaderEl = wizardEl.createDiv({cls: 'rpg-manager-wizard-header'});
		this._wizardHeaderEl.createEl('h2', {text: 'Plot Creation Wizard'});

		this._wizardNavigationEl = wizardEl.createDiv({cls: 'rpg-manager-wizard-navigation'});

		const mainContentEl = wizardEl.createDiv({cls: 'rpg-manager-wizard-main clearfix'});
		this._wizardRecapEl = mainContentEl.createDiv({cls: 'rpg-manager-wizard-main-recap'});
		this._wizardContentEl = mainContentEl.createDiv({cls: 'rpg-manager-wizard-main-content clearfix'});

		this._wizardButtonEl = wizardEl.createDiv({cls: 'rpg-manager-wizard-buttons'});

		this.move(0);
	}

	close() {
		super.close();
	}

	public async move(
		newStep: number,
	): Promise<void> {
		if (this._currentPartInterface !== undefined)
			this._currentPartInterface.save();

		this._updateNavigation(newStep);
		this._updateRecap(this._wizardRecapEl);
		this._updateButtons(newStep);

		this._render(newStep);

		if (!this.isInitialised)
			this.isInitialised = true;
	}

	private async _updateNavigation(
		newStep: number,
	): Promise<void> {
		if (!this.isInitialised)
			this._navigationPart = new NavigationPart(this.steps, this._wizardNavigationEl, this.move.bind(this));

		this._navigationPart.render(newStep);
	}

	private async _updateButtons(
		step: number,
	): Promise<void> {
		if (!this.isInitialised) {
			this._nextButtonEl = this._wizardButtonEl.createEl('button');
			this._backButtonEl = this._wizardButtonEl.createEl('button', {text: 'Back'});

			this._backButtonEl.addEventListener('click', () => {
				if (this._currentStep !== 0)
					this.move(this._currentStep - 1);

			});

			this._nextButtonEl.addEventListener('click', () => {
				if (this._currentStep === this.steps) {
					if (this._currentPartInterface !== undefined)
						this._currentPartInterface.save();

					this.create();
				} else {
					this.move(this._currentStep + 1);
				}
			});
		}

		this._currentStep = step;

		if (this._currentStep === 0)
			this._backButtonEl.disabled = true;
		else
			this._backButtonEl.disabled = false;

		if (this._currentStep === this.steps)
			this._nextButtonEl.textContent = 'Create Plot';
		else
			this._nextButtonEl.textContent = 'Next >';
	}

	protected getClueHint(
		clue?: WizardDataClueInterface,
	): string {
		if (clue === undefined || clue.name === undefined || clue.name === '')
			return '';

		let response = '(*information "[[' + clue.name + ']]"';

		if (clue.leads !== undefined && clue.leads.length > 0) {
			let leads = '';

			for (let index=0; index<clue.leads.length; index++){
				leads += ' [[' + clue.leads[index] + ']],';
			}

			if (leads !== ''){
				leads = leads.substring(0, leads.length - 1);

				response += ' available from' + leads;
			}
		}

		response += '*)';

		return response;
	}

	private async _render(
		newStep: number,
	): Promise<void> {
		this._currentPartInterface = this.getStepInterface(newStep);

		this._wizardContentEl.empty();
		this._currentPartInterface.render(this._wizardContentEl);
	}

	protected abstract getStepInterface(
		newStep: number
	): WizardPartInterface;

	protected abstract _updateRecap(
		containerEl: HTMLDivElement,
	): Promise<void>;

	protected abstract create(
	): Promise<void>;
}
