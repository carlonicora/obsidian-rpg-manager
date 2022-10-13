import {AbstractModal} from "./abstracts/AbstractModal";
import {App, TFile} from "obsidian";
import {ComponentType} from "../components/enums/ComponentType";
import {IdInterface} from "../id/interfaces/IdInterface";
import {DatabaseInitialiser} from "../databases/DatabaseInitialiser";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {InvalidIdChecksumError} from "../errors/InvalidIdChecksumError";

export class IdSwitcherModal extends AbstractModal {
	private id: IdInterface;
	private newId: IdInterface;
	private updateButtonEl: HTMLButtonElement;
	private newIdEl: HTMLInputElement;
	private errorIdEl: HTMLSpanElement;

	constructor(
		app: App,
		private file: TFile,
	) {
		super(app);
		this.title = 'Component ID Updater'
	}

	onClose() {
		super.onClose();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();

		DatabaseInitialiser.readID(this.file)
			.then((id: IdInterface) => {
				this._processId(id);
			})
			.catch((e: InvalidIdChecksumError) => {
				if (e.id !== undefined) this._processId(e.id);
			});
	}

	private async _processId(
		id: IdInterface,
	): Promise<void> {
		this.id = id;

		const descriptorEl = this.rpgmContainerEl.createDiv();
		descriptorEl.textContent = 'Use this form to change the position of the ' + ComponentType[this.id.type] +
			' "' + this.file.basename + '" in the Campaign hierarchy';

		const formEl = this.rpgmContainerEl.createDiv();

		const buttonContainerEl = this.rpgmContainerEl.createDiv();
		this.updateButtonEl = buttonContainerEl.createEl('button', {text: 'Update the identifier'});
		this.updateButtonEl.disabled = true;

		this.updateButtonEl.addEventListener('click', this.save.bind(this));

		if (this.id.type === ComponentType.Campaign){
			const newCampaignId = this._proposeNewId(ComponentType.Campaign);
			this.newId = this.factories.id.create(
				ComponentType.Campaign,
				newCampaignId,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				this.id.campaignSettings,
			);

			this._addIdSelector(formEl, newCampaignId.toString());

			this.updateButtonEl.disabled = false;
		} else {
			this._addSelector(formEl, ComponentType.Campaign);
		}
	}

	private _addIdSelector(
		containerId: HTMLDivElement,
		newId: string,
	): void {
		containerId.createDiv({cls: 'input-title', text: 'New ID'})
		containerId.createEl('div', {text: 'The proposed new ID is ' + newId + ' but you can change it if you want'});
		this.newIdEl = containerId.createEl('input', {type: 'text'});
		this.errorIdEl = containerId.createSpan({text: 'The selected ID is already in use. Please select a different one'});
		this.errorIdEl.style.display = 'none';
		this.newIdEl.value = newId;
		this.newIdEl.addEventListener('keyup', this._validateNewId.bind(this));
	}

	private _validateNewId(
	): void {
		switch (this.newId.type){
			case ComponentType.Campaign:
				this.newId = this.factories.id.create(ComponentType.Campaign, +this.newIdEl.value, undefined, undefined, undefined, undefined, undefined, this.id.campaignSettings);
				break;
			case ComponentType.Adventure:
				this.newId = this.factories.id.create(ComponentType.Adventure, this.newId.campaignId, +this.newIdEl.value, undefined, undefined, undefined, undefined, this.id.campaignSettings);
				break;
			case ComponentType.Act:
				this.newId = this.factories.id.create(ComponentType.Act, this.newId.campaignId, this.newId.adventureId, +this.newIdEl.value, undefined, undefined, undefined, this.id.campaignSettings);
				break;
			case ComponentType.Scene:
				this.newId = this.factories.id.create(ComponentType.Scene, this.newId.campaignId, this.newId.adventureId, this.newId.actId, +this.newIdEl.value, undefined, undefined, this.id.campaignSettings);
				break;
			case ComponentType.Session:
				this.newId = this.factories.id.create(ComponentType.Session, +this.newIdEl.value, undefined, undefined, undefined, +this.newIdEl.value, undefined, this.id.campaignSettings);
				break;
			default:
				return;
		}

		try {
			this.database.readSingle<ComponentInterface>(this.newId.type, this.newId);
			this.updateButtonEl.disabled = true;
			this.errorIdEl.style.display = '';
		} catch (e) {
			this.updateButtonEl.disabled = false;
			this.errorIdEl.style.display = 'none';
		}
	}

	private async save(
	): Promise<void>{
		this.manipulators.codeblock.replaceID(this.file, this.newId.stringID);
		this.close();
	}

	private _addSelector(
		containerEl: HTMLDivElement,
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
		sessionId: number|undefined = undefined,
	): void {
		const selectorContainerEl: HTMLDivElement = containerEl.createDiv();
		selectorContainerEl.createDiv({
			cls: 'input-title',
			text: 'Select the ' + ComponentType[type] +
				' the ' + ComponentType[this.id.type] + ' belongs to'
		});

		const typeSelectorEl: HTMLSelectElement = selectorContainerEl.createDiv().createEl('select');

		typeSelectorEl.createEl('option', {value: '', text: ''}).selected;

		this._fillSelector(
			typeSelectorEl,
			type,
			campaignId,
			adventureId,
			actId,
			sessionId,
		);
	}

	private _fillSelector(
		selectorEl: HTMLSelectElement,
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
		sessionId: number|undefined = undefined,
	): void {
		const components = this._loadPossibleChildren(type, campaignId, adventureId, actId);

		const subContainerEl: HTMLDivElement|undefined = selectorEl.parentElement?.createDiv();

		components.forEach((component: ComponentInterface) => {
			selectorEl.createEl('option', {text: component.file.basename, value: component.id.id.toString()});
		});

		if (subContainerEl !== undefined) {
			selectorEl.addEventListener('change', () => {
				subContainerEl.empty();
				let hasLoadedSomethingElse = false;
				let hasMissingValidId = false;

				let idValues: {
					type: ComponentType,
					campaignId: number,
					adventureId?: number,
					actId?: number,
					sceneId?: number,
					sessionId?: number,
				}|undefined = undefined;

				switch (type) {
					case ComponentType.Campaign:
						if (this.id.type === ComponentType.Adventure) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value, adventureId: this.id.adventureId};
								if (!this._isExistingIdValid(ComponentType.Adventure, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value};
								hasMissingValidId = true;
							}

						} else if (this.id.type === ComponentType.Session) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value, sessionId: this.id.sessionId};
								if (!this._isExistingIdValid(ComponentType.Session, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this.id.type === ComponentType.Act || this.id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Adventure, +selectorEl.value);
						} else {
							idValues = {type: this.id.type, campaignId: +selectorEl.value};
						}
						break;
					case ComponentType.Adventure:
						if (this.id.type === ComponentType.Act) {
							try {
								idValues = {type: ComponentType.Act, campaignId: campaignId ?? 0, adventureId: +selectorEl.value, actId: this.id.actId};
								if (!this._isExistingIdValid(ComponentType.Act, campaignId, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Act, campaignId: campaignId ?? 0, adventureId: +selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this.id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Act, campaignId, +selectorEl.value);
						}
						break;
					case ComponentType.Act:
						if (this.id.type === ComponentType.Scene) {
							try {
								idValues = {type: ComponentType.Scene, campaignId: campaignId ?? 0, adventureId: adventureId, actId: +selectorEl.value, sceneId: this.id.sceneId};
								if (!this._isExistingIdValid(ComponentType.Scene, campaignId, adventureId, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Scene, campaignId: campaignId ?? 0, adventureId: adventureId, actId: +selectorEl.value,};
								hasMissingValidId = true;
							}
						} else {
							hasLoadedSomethingElse = true
							this._addSelector(subContainerEl, ComponentType.Scene, campaignId, adventureId, +selectorEl.value)
						}
						break;
				}

				if (!hasLoadedSomethingElse) {
					if (idValues !== undefined){
						if (hasMissingValidId){
							const newId = this._proposeNewId(idValues.type, idValues.campaignId, idValues.adventureId, idValues.actId,)

							switch (idValues.type){
								case ComponentType.Campaign:
									idValues.campaignId = newId;
									break;
								case ComponentType.Adventure:
									idValues.adventureId = newId;
									break;
								case ComponentType.Act:
									idValues.actId = newId;
									break;
								case ComponentType.Scene:
									idValues.sceneId = newId;
									break;
								case ComponentType.Session:
									idValues.sessionId = newId;
									break;
							}

							this._addIdSelector(subContainerEl, newId.toString());
						} else {
							let newId: number|undefined = undefined;
							switch (idValues.type){
								case ComponentType.Campaign:
									newId =idValues.campaignId;
									break;
								case ComponentType.Adventure:
									newId = idValues.adventureId;
									break;
								case ComponentType.Act:
									newId = idValues.actId;
									break;
								case ComponentType.Scene:
									newId = idValues.sceneId;
									break;
								case ComponentType.Session:
									newId = idValues.sessionId;
									break;
							}

							if (newId !== undefined) this._addIdSelector(subContainerEl, newId.toString());
						}

						this.newId = this.factories.id.create(
							idValues.type,
							idValues.campaignId,
							idValues.adventureId,
							idValues.actId,
							idValues.sceneId,
							idValues.sessionId,
							undefined,
							this.id.campaignSettings,
						)
						this.updateButtonEl.disabled = false;
					}
				}
			});
		}
	}

	private _proposeNewId(
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
	): number {
		let response = 1;

		let components: Array<ComponentInterface>;
		if (type === ComponentType.Scene){
			components = this.database.read<ComponentInterface>((component: ComponentInterface) =>
				component.id.type === type &&
				component.id.campaignId === campaignId &&
				component.id.adventureId === adventureId &&
				component.id.actId === actId
			);
		} else {
			components = this.database.read<ComponentInterface>((component: ComponentInterface) =>
				component.id.type === type &&
				(campaignId !== undefined ? component.id.campaignId === campaignId : true)
			);
		}

		components.forEach((component: ComponentInterface) => {
			if (component.id.id >= response) response = component.id.id + 1;
		});

		return response;
	}

	private _isExistingIdValid(
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
	): boolean {
		const components = this._loadPossibleChildren(type, campaignId, adventureId, actId);

		const match = components.filter((component: ComponentInterface) => this.id.id === component.id.id);

		return match.length === 0;
	}

	private _loadPossibleChildren(
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
	): Array<ComponentInterface>{
		return this.database.read<ComponentInterface>((component: ComponentInterface) =>
			component.id.type === type &&
			(campaignId !== undefined ? component.id.campaignId === campaignId : true) &&
			(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
			(actId !== undefined ? component.id.actId === actId : true)
		);
	}
}
