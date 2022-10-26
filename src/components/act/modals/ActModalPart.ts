import {ComponentType} from "../../../core/enums/ComponentType";
import {App} from "obsidian";
import {ActInterface} from "../interfaces/ActInterface";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {AbstractModalPart} from "../../../core/abstracts/AbstractModalPart";
import {IdService} from "../../../services/idService/IdService";

export class ActModalPart extends AbstractModalPart {
	private _acts: ActInterface[];
private _allAct:ActInterface[];
private _actEl: HTMLSelectElement;
private _actErrorEl: HTMLParagraphElement;
private _childEl: HTMLDivElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		if (this.modal.actId === undefined) {
			this.modal.actId = this.api.service(IdService).create(ComponentType.Act, this.modal.campaignId.id, this.modal.adventureId?.id);
			this.modal.actId.id = 0;
		}

		this._allAct = this.database.read<ActInterface>(
			(component: ActInterface) =>
				component.id.type === ComponentType.Act &&
				component.id.campaignId === this.modal.campaignId.id
		);

		this._acts = this.database.read<ActInterface>(
			(component: ActInterface) =>
				component.id.type === ComponentType.Act &&
				component.id.campaignId === this.modal.campaignId.id &&
				component.id.adventureId === this.modal.adventureId?.id
		);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const actEl = contentEl.createDiv({cls: 'actContainer'});

		if (this.modal.type === ComponentType.Act){
			this._addNewActElements(actEl);
		} else {
			if (this._acts.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Acts missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager ActModel for the selected adventure. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first act for the adventure.'});
			} else {
				this._childEl = contentEl.createDiv({cls: 'child'});
				this._childEl.id = 'ActChild';
				this._selectActElements(actEl);
			}

		}

		if (this.modal.type === ComponentType.Act){
			this.modal.saver = this;
			this.modal.enableButton();
		}
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
		this.modal.sceneModal = this.factories.modals.create(
			this.modal.campaignSetting,
			ComponentType.Scene,
			this.modal,
		);

		this.modal.sceneModal.addElement(
			containerEl,
		);
	}

	public validate(
	): boolean {
		if (this.modal.actId?.id === 0)
			this.modal.actId.id = 1;

		return true;
	}

	private _addNewActElements(
		containerEl: HTMLElement,
	): void {
		this._allAct.forEach((component: ActInterface) => {
			if (this.modal.actId !== undefined && (component.id.actId ?? 0) >= (this.modal.actId.id ?? 0)) {
				this.modal.actId.id = ((component.id.actId ?? 0) + 1);
			}
		});
	}

	private _selectActElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'group'});
		groupElement.createDiv({cls: 'title', text: 'Act'});
		const selectionContainerEl = groupElement.createDiv({cls: 'container'});
		groupElement.createDiv({cls: 'clear'});
		this._actEl = selectionContainerEl.createEl('select');

		if (this._acts.length > 1) {
			this._actEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this._acts.forEach((act: ActInterface) => {
			const actOptionEl = this._actEl.createEl('option', {
				text: act.file.basename,
				value: act.id.actId?.toString(),
			});

			if (this._acts.length === 1 || this.modal.actId?.id === act.id.actId){
				actOptionEl.selected = true;
				this._selectAct();
			}
		});

		this._actEl.addEventListener('change', (e: Event) => {
			this._selectAct();
		});

		this._actErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private _selectAct(
	): void {
		if (this.modal.actId === undefined) {
			this.modal.actId = this.factories.id.create(ComponentType.Adventure, this.modal.campaignId.id, this.modal.adventureId?.id);
		}

		if (this.modal.actId !== undefined){
			this.modal.actId.id = +this._actEl.value;
		}

		this._childEl.empty();
		this.loadChild(this._childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
