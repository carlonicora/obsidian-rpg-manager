import {TFile} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "../interfaces/IndexInterface";
import {DatabaseInitialiser} from "../../../managers/databaseManager/DatabaseInitialiser";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {InvalidIdChecksumError} from "../../../core/errors/InvalidIdChecksumError";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../IndexService";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";

export class IndexSwitcherModal extends AbstractModal {
	private _id: IndexInterface;
	private _newId: IndexInterface;
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
			.then((index: IndexInterface) => {
				this._processId(index);
			})
			.catch((e: InvalidIdChecksumError) => {
				if (e.index !== undefined) this._processId(e.index);
			});
	}

	private async _processId(
		id: IndexInterface,
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

		if (this._id.type !== ComponentType.Campaign)
			this._addSelector(formEl, ComponentType.Campaign, id.campaignId);

	}

	private _addIdSelector(
		containerId: HTMLDivElement,
		newPositionInParent: number,
	): void {
		containerId.createDiv({cls: 'input-title', text: 'New ID'});
		containerId.createEl('div', {text: 'The proposed new ID is ' + newPositionInParent + ' but you can change it if you want'});
		this._newIdEl = containerId.createEl('input', {type: 'text'});
		this._errorIdEl = containerId.createSpan({text: 'The selected ID is already in use. Please select a different one'});
		this._errorIdEl.style.display = 'none';
		this._newIdEl.value = newPositionInParent.toString();
		this._newIdEl.addEventListener('keyup', this._validateNewId.bind(this));
	}

	private _validateNewId(
	): void {
		switch (this._newId.type){
			case ComponentType.Adventure:
				this._newId = this.api.service(IndexService).create(ComponentType.Adventure, this._newId.campaignId, this._newIdEl.value, undefined, undefined, undefined, this._newId.positionInParent, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Act:
				this._newId = this.api.service(IndexService).create(ComponentType.Act, this._newId.campaignId, this._newId.adventureId, this._newIdEl.value, undefined, undefined, this._newId.positionInParent, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Scene:
				this._newId = this.api.service(IndexService).create(ComponentType.Scene, this._newId.campaignId, this._newId.adventureId, this._newId.actId, this._newIdEl.value, undefined, this._newId.positionInParent, undefined, this._id.campaignSettings);
				break;
			case ComponentType.Session:
				this._newId = this.api.service(IndexService).create(ComponentType.Session, this._newIdEl.value, undefined, undefined, undefined, this._newIdEl.value, this._newId.positionInParent, undefined, this._id.campaignSettings);
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
		await this.api.service(CodeblockService).replaceID(this._file, this._newId.stringID);

		if (this._id.type === ComponentType.Adventure || this._id.type === ComponentType.Act)
			await this._updateChildIds(this._id, this._newId, this._file);

		this.close();
	}

	private async _updateChildIds(
		id: IndexInterface,
		newId: IndexInterface,
		file: TFile
	): Promise<void> {
		if (id.type === ComponentType.Adventure){
			const acts = this.api.database.readList<ActInterface>(ComponentType.Act, id);

			if (acts.length > 0) {
				for (let index=0; index<acts.length; index++){
					if (newId.adventureId !== undefined) {
						const oldId = this.api.service(IndexService).createFromID(acts[index].index.stringID);
						acts[index].index.replaceId(ComponentType.Campaign, newId.campaignId);
						acts[index].index.replaceId(ComponentType.Adventure, newId.adventureId);
						await this.api.service(CodeblockService).replaceID(acts[index].file, acts[index].index.stringID);

						await this._updateChildIds(oldId, acts[index].index, acts[index].file);
					}
				}
			}
		} else if (id.type === ComponentType.Act){
			const scenes = this.api.database.readList<SceneInterface>(ComponentType.Scene, id);

			if (scenes.length > 0){
				for (let index=0; index<scenes.length; index++){
					if (newId.adventureId !== undefined && newId.actId !== undefined) {
						scenes[index].index.replaceId(ComponentType.Campaign, newId.campaignId);
						scenes[index].index.replaceId(ComponentType.Adventure, newId.adventureId);
						scenes[index].index.replaceId(ComponentType.Act, newId.actId);
						await this.api.service(CodeblockService).replaceID(scenes[index].file, scenes[index].index.stringID);
					}
				}
			}
		}
	}

	private _addSelector(
		containerEl: HTMLDivElement,
		type: ComponentType,
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sessionId?: string,
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
		campaignId: string,
		adventureId?: string,
		actId?: string,
		sessionId?: string,
	): void {
		const components = this._loadPossibleChildren(type, campaignId, adventureId, actId);

		const subContainerEl: HTMLDivElement|undefined = selectorEl.parentElement?.createDiv();

		components.forEach((component: ModelInterface) => {
			selectorEl.createEl('option', {text: component.file.basename, value: component.index.id.toString()});
		});

		if (subContainerEl !== undefined) {
			selectorEl.addEventListener('change', () => {
				subContainerEl.empty();
				let hasLoadedSomethingElse = false;
				let hasMissingValidId = false;

				let idValues: {
					type: ComponentType,
					campaignId: string,
					adventureId?: string,
					actId?: string,
					sceneId?: string,
					sessionId?: string,
					positionInParent?: number,
				}|undefined = undefined;

				switch (type) {
					case ComponentType.Campaign:
						if (this._id.type === ComponentType.Adventure) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: selectorEl.value, adventureId: this._id.adventureId};
								if (!this._isExistingIdValid(ComponentType.Adventure, selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: selectorEl.value};
								hasMissingValidId = true;
							}

						} else if (this._id.type === ComponentType.Session) {
							try {
								idValues = {type: ComponentType.Adventure, campaignId: selectorEl.value, sessionId: this._id.sessionId};
								if (!this._isExistingIdValid(ComponentType.Session, selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Adventure, campaignId: selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this._id.type === ComponentType.Act || this._id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Adventure, selectorEl.value);
						} else {
							idValues = {type: this._id.type, campaignId: selectorEl.value};
						}
						break;
					case ComponentType.Adventure:
						if (this._id.type === ComponentType.Act) {
							try {
								idValues = {type: ComponentType.Act, campaignId: campaignId, adventureId: selectorEl.value, actId: this._id.actId};
								if (!this._isExistingIdValid(ComponentType.Act, campaignId, selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Act, campaignId: campaignId, adventureId: selectorEl.value};
								hasMissingValidId = true;
							}
						} else if (this._id.type === ComponentType.Scene) {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Act, campaignId, selectorEl.value);
						}
						break;
					case ComponentType.Act:
						if (this._id.type === ComponentType.Scene) {
							try {
								idValues = {type: ComponentType.Scene, campaignId: campaignId, adventureId: adventureId, actId: selectorEl.value, sceneId: this._id.sceneId};
								if (!this._isExistingIdValid(ComponentType.Scene, campaignId, adventureId, selectorEl.value)) hasMissingValidId = true;
							} catch (e) {
								idValues = {type: ComponentType.Scene, campaignId: campaignId, adventureId: adventureId, actId: selectorEl.value,};
								hasMissingValidId = true;
							}
						} else {
							hasLoadedSomethingElse = true;
							this._addSelector(subContainerEl, ComponentType.Scene, campaignId, adventureId, selectorEl.value);
						}
						break;
				}

				if (!hasLoadedSomethingElse) {
					if (idValues !== undefined){
						let newPositionInParent: number|undefined = undefined;

						if (hasMissingValidId){
							newPositionInParent = this._proposePositionInParent(idValues.type, idValues.campaignId, idValues.adventureId, idValues.actId,);

							switch (idValues.type){
								case ComponentType.Campaign:
								case ComponentType.Adventure:
								case ComponentType.Act:
								case ComponentType.Scene:
								case ComponentType.Session:
									idValues.positionInParent = newPositionInParent;
									break;
							}

							this._addIdSelector(subContainerEl, newPositionInParent);
						} else {
							if (idValues.positionInParent !== undefined)
								this._addIdSelector(subContainerEl, idValues.positionInParent);

						}

						this._newId = this.api.service(IndexService).create(
							idValues.type,
							idValues.campaignId,
							idValues.adventureId,
							idValues.actId,
							idValues.sceneId,
							idValues.sessionId,
							idValues.positionInParent,
							undefined,
							this._id.campaignSettings,
						);
						this._updateButtonEl.disabled = false;
					}
				}
			});
		}
	}

	private _proposePositionInParent(
		type: ComponentType,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
	): number {
		if (type !== ComponentType.Scene && type !== ComponentType.Adventure && type !== ComponentType.Act && type !== ComponentType.Session)
			return 0;

		let response = 1;

		let components: ModelInterface[];
		if (type === ComponentType.Scene){
			components = this.api.database.read<ModelInterface>((component: ModelInterface) =>
				component.index.type === type &&
				component.index.campaignId === campaignId &&
				component.index.adventureId === adventureId &&
				component.index.actId === actId
			);
		} else {
			components = this.api.database.read<ModelInterface>((component: ModelInterface) =>
				component.index.type === type &&
				(campaignId !== undefined ? component.index.campaignId === campaignId : true)
			);
		}

		components.forEach((component: ModelInterface) => {

			if (component.index.type === ComponentType.Scene) {
				if (component.index.positionInParent >= response)
					response = component.index.positionInParent + 1;

			} else {
				if (component.index.positionInParent >= response)
					response = component.index.positionInParent + 1;

			}

		});

		return response;
	}

	private _isExistingIdValid(
		type: ComponentType,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
	): boolean {
		const components = this._loadPossibleChildren(type, campaignId, adventureId, actId);

		const match = components.filter((component: ModelInterface) => this._id.id === component.index.id);

		return match.length === 0;
	}

	private _loadPossibleChildren(
		type: ComponentType,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
	): ModelInterface[]{
		return this.api.database.read<ModelInterface>((component: ModelInterface) =>
			component.index.type === type &&
			(campaignId !== undefined ? component.index.campaignId === campaignId : true) &&
			(adventureId !== undefined ? component.index.adventureId === adventureId : true) &&
			(actId !== undefined ? component.index.actId === actId : true)
		);
	}
}
