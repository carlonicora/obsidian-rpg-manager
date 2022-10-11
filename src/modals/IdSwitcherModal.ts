import {AbstractModal} from "./abstracts/AbstractModal";
import {App, TFile} from "obsidian";
import {ComponentType} from "../databases/enums/ComponentType";
import {IdInterface} from "../databases/interfaces/IdInterface";
import {DatabaseInitialiser} from "../databases/DatabaseInitialiser";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {InvalidIdChecksumError} from "../errors/InvalidIdChecksumError";

export class IdSwitcherModal extends AbstractModal {
	private id: IdInterface;
	private newId: IdInterface;
	private updateButtonEl: HTMLButtonElement;

	constructor(
		app: App,
		private file: TFile,
	) {
		super(app);
		this.title = 'Component Updated'
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
				newCampaignId
			);
			this.updateButtonEl.disabled = false;
		} else {
			this._addSelector(formEl, ComponentType.Campaign);
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
						}

						console.log(idValues)

						this.newId = this.factories.id.create(
							idValues.type,
							idValues.campaignId,
							idValues.adventureId,
							idValues.actId,
							idValues.sceneId,
							idValues.sessionId,
						)
						this.updateButtonEl.disabled = false;
					} else {
						//NEED SOMETHING ELSE
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

		console.warn(components)

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
