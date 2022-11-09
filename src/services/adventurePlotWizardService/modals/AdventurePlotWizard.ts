import {AbstractWizardModal} from "../../../managers/modalsManager/abstracts/AbstractWizardModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {StepIntroductionModal} from "./steps/StepIntroductionModal";
import {StepDescriptionModal} from "./steps/StepDescriptionModal";
import {StepDescriptionAndCluesModal} from "./steps/StepDescriptionAndCluesModal";

export class AdventurePlotWizard extends AbstractWizardModal {
	protected steps = 8;

	private _steps: Map<number, WizardPartInterface> = new Map<number, WizardPartInterface>();

	private _youEl: HTMLDivElement;
	private _needEl: HTMLDivElement;
	private _goEl: HTMLDivElement;
	private _searchEl: HTMLDivElement;
	private _findEl: HTMLDivElement;
	private _takeEl: HTMLDivElement;
	private _returnEl: HTMLDivElement;
	private _changeEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		private _adventureId: IdInterface,
	) {
		super(api);

		this._steps.set(0, new StepIntroductionModal(
			this.api,
			this._adventureId,
			''
		));
		this._steps.set(1, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'What is the current status of the player characters? Where they are in the story and what they have decided to do at the end of the previous session?'
		));
		this._steps.set(2, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'What the player characters will think they should achive in the adventure? This is the perceived goal.'
		));
		this._steps.set(3, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'What do the player characters realise when they achieve their perceived goal?'
		));
		this._steps.set(4, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'What is the real goal of the adventure?'
		));
		this._steps.set(5, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'What happens to convince the player characters to try and achieve the perceived goal?'
		));
		this._steps.set(6, new StepDescriptionAndCluesModal(
			this.api,
			this._adventureId,
			'What clue will lead the player characters to reach their perceived goal?'
		));
		this._steps.set(7, new StepDescriptionAndCluesModal(
			this.api,
			this._adventureId,
			'When they pay the price, what is the clue that will lead them to the real goal?'
		));
		this._steps.set(8, new StepDescriptionModal(
			this.api,
			this._adventureId,
			'How are they going to triumph?'
		));
	}

	protected getStepInterface(
		newStep: number
	): WizardPartInterface {
		const response: WizardPartInterface|undefined = this._steps.get(newStep);

		if (response === undefined)
			throw new Error('');

		return response;
	}

	protected async _updateRecap(
		containerEl: HTMLDivElement,
	): Promise<void> {
		if (!this.isInitialised) {
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'You'});
			this._youEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Need'});
			this._needEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Go'});
			this._goEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Search'});
			this._searchEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Find'});
			this._findEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Take'});
			this._takeEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Return'});
			this._returnEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Change'});
			this._changeEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
		} else {
			const youText = this._steps.get(1)?.data?.description;
			const goText = this._steps.get(2)?.data?.description;
			const findText = this._steps.get(3)?.data?.description;
			const returnText = this._steps.get(4)?.data?.description;
			const needText = this._steps.get(5)?.data?.description;
			const searchText = this._steps.get(6)?.data?.description;
			const takeText = this._steps.get(7)?.data?.description;
			const changeText = this._steps.get(8)?.data?.description;

			this._youEl.textContent = (youText ? youText.substring(0, 20) + '...' : '');
			this._needEl.textContent = (needText ? needText.substring(0, 20) + '...' : '');
			this._goEl.textContent = (goText ? goText.substring(0, 20) + '...' : '');
			this._searchEl.textContent = (searchText ? searchText.substring(0, 20) + '...' : '');
			this._findEl.textContent = (findText ? findText.substring(0, 20) + '...' : '');
			this._takeEl.textContent = (takeText ? takeText.substring(0, 20) + '...' : '');
			this._returnEl.textContent = (returnText ? returnText.substring(0, 20) + '...' : '');
			this._changeEl.textContent = (changeText ? changeText.substring(0, 20) + '...' : '');
		}
	}

	protected async create(
	): Promise<void> {
		console.warn('Creating everything now!');
	}
}
