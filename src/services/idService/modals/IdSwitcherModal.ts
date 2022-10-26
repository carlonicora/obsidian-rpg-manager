import {TFile} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IdInterface} from "../interfaces/IdInterface";
import {DatabaseInitialiser} from "../../../database/DatabaseInitialiser";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {InvalidIdChecksumError} from "../../../core/errors/InvalidIdChecksumError";
import {AbstractModal} from "../../../core/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdService} from "../IdService";
import {CodeblockService} from "../../codeblockService/CodeblockService";

export class IdSwitcherModal extends AbstractModal {
	private _id: IdInterface;
	private _newId: IdInterface;
	private _updateButtonEl: HTMLButtonElement;
	private _newIdEl: HTMLInputElement;
	private _errorIdEl: HTMLSpanElement;

	constructor(
		api: RpgManagerApiInterface,
		private _file: TFile,
	) {
		super(api);
		this.title = 'Component ID Updater';
	}

	onClose() {
		super.onClose();
		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();

		DatabaseInitialiser.readID(this._file)
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
		this._id = id;

		const descriptorEl = this.rpgmContainerEl.createDiv();
		descriptorEl.textContent = 'Use this form to change the position of the ' + ComponentType[this._id.type] +
			' "' + this._file.basename + '" in the CampaignModel hierarchy';

		const formEl = this.rpgmContainerEl.createDiv();

		const buttonContainerEl = this.rpgmContainerEl.createDiv();
		this._updateButtonEl = buttonContainerEl.createEl('button', {text: 'Update the identifier'});
		this._updateButtonEl.disabled = true;

		this._updateButtonEl.addEventListener('click', this._save.bind(this));

		if (this._id.type === ComponentType.Campaign){
			const newCampaignId = this._proposeNewId(ComponentType.Campaign);
			this._newId = this.api.service(IdService).create(
				ComponentType.Campaign,
				newCampaignId,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				this._id.campaignSettings,
			);

			this._addIdSelector(formEl, newCampaignId.toString());

			this._updateButtonEl.disabled = false;
		} else {
			this._addSelector(formEl, ComponentType.Campaign);
		}
	}

	private _addIdSelector(
		containerId: HTMLDivElement,
		newId: string,
	): void {
		containerId.createDiv({cls: 'input-title', text: 'New ID'});
		containerId.createEl('div', {text: 'The proposed new ID is ' + newId + ' but you can change it if you want'});
		this._newIdEl = containerId.createEl('input', {type: 'text'});
		this._errorIdEl = containerId.createSpan({text: 'The selected ID is already in use. Please select a different one'});
		this._errorIdEl.style.display = 'none';
		this._newIdEl.value = newId;
		this._newIdEl.addEventListener('keyup', this._validateNewId.bind(this));
	}

	private _validateNewId(
	): void {
		switch (this._newId.type){
			case ComponentType.Campaign:
				this._newId = this.api.service(IdService).create(ComponentType.Campaign, +this._newIdEl.value, undefined, undefined, undefined, undefined, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Adventure:
				this._newId = this.api.service(IdService).create(ComponentType.Adventure, this._newId.campaignId, +this._newIdEl.value, undefined, undefined, undefined, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Act:
				this._newId = this.api.service(IdService).create(ComponentType.Act, this._newId.campaignId, this._newId.adventureId, +this._newIdEl.value, undefined, undefined, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Scene:
				this._newId = this.api.service(IdService).create(ComponentType.Scene, this._newId.campaignId, this._newId.adventureId, this._newId.actId, +this._newIdEl.value, undefined, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Session:
				this._newId = this.api.service(IdService).create(ComponentType.Session, +this._newIdEl.value, undefined, undefined, undefined, +this._newIdEl.value, undefined, this._id.campaignSettings);
				break;
			default:
				return;
		}

		try {
			this.api.database.readSingle<ModelInterface>(this._newId.type, this._newId);
			this._updateButtonEl.disabled = true;
			this._errorIdEl.style.display = '';
		} catch (e) {
			this._updateButtonEl.disabled = false;
			this._errorIdEl.style.display = 'none';
		}
	}

	private async _save(
	): Promise<void>{
		this.api.service(CodeblockService).replaceID(this._file, this._newId.stringID);
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
				' the ' + ComponentType[this._id.type] + ' belongs to'
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

		components.forEach((component: ModelInterface) => {
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
						if (this._id.type === ComponentType.Adventure) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value, adventureId: this._id.adventureId};
								if (!this._isExistingIdValid(ComponentType.Adventure, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value};
								hasMissingValidId = true;
							}

						} else if (this._id.type === ComponentType.Session) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value, sessionId: this._id.sessionId};
								if (!this._isExistingIdValid(ComponentType.Session, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: +selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this._id.type === ComponentType.Act || this._id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Adventure, +selectorEl.value);
						} else {
							idValues = {type: this._id.type, campaignId: +selectorEl.value};
						}
						break;
					case ComponentType.Adventure:
						if (this._id.type === ComponentType.Act) {
							try {
								idValues = {type: ComponentType.Act, campaignId: campaignId ?? 0, adventureId: +selectorEl.value, actId: this._id.actId};
								if (!this._isExistingIdValid(ComponentType.Act, campaignId, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Act, campaignId: campaignId ?? 0, adventureId: +selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this._id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Act, campaignId, +selectorEl.value);
						}
						break;
					case ComponentType.Act:
						if (this._id.type === ComponentType.Scene) {
							try {
								idValues = {type: ComponentType.Scene, campaignId: campaignId ?? 0, adventureId: adventureId, actId: +selectorEl.value, sceneId: this._id.sceneId};
								if (!this._isExistingIdValid(ComponentType.Scene, campaignId, adventureId, +selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Scene, campaignId: campaignId ?? 0, adventureId: adventureId, actId: +selectorEl.value,};
								hasMissingValidId = true;
							}
						} else {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Scene, campaignId, adventureId, +selectorEl.value);
						}
						break;
				}

				if (!hasLoadedSomethingElse) {
					if (idValues !== undefined){
						if (hasMissingValidId){
							const newId = this._proposeNewId(idValues.type, idValues.campaignId, idValues.adventureId, idValues.actId,);

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

						this._newId = this.api.service(IdService).create(
							idValues.type,
							idValues.campaignId,
							idValues.adventureId,
							idValues.actId,
							idValues.sceneId,
							idValues.sessionId,
							undefined,
							this._id.campaignSettings,
						);
						this._updateButtonEl.disabled = false;
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

		let components: ModelInterface[];
		if (type === ComponentType.Scene){
			components = this.api.database.read<ModelInterface>((component: ModelInterface) =>
				component.id.type === type &&
				component.id.campaignId === campaignId &&
				component.id.adventureId === adventureId &&
				component.id.actId === actId
			);
		} else {
			components = this.api.database.read<ModelInterface>((component: ModelInterface) =>
				component.id.type === type &&
				(campaignId !== undefined ? component.id.campaignId === campaignId : true)
			);
		}

		components.forEach((component: ModelInterface) => {
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

		const match = components.filter((component: ModelInterface) => this._id.id === component.id.id);

		return match.length === 0;
	}

	private _loadPossibleChildren(
		type: ComponentType,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
	): ModelInterface[]{
		return this.api.database.read<ModelInterface>((component: ModelInterface) =>
			component.id.type === type &&
			(campaignId !== undefined ? component.id.campaignId === campaignId : true) &&
			(adventureId !== undefined ? component.id.adventureId === adventureId : true) &&
			(actId !== undefined ? component.id.actId === actId : true)
		);
	}
}
