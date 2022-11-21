import {ComponentType} from "../../../core/enums/ComponentType";
import {ActInterface} from "../interfaces/ActInterface";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {IndexService} from "../../../services/indexService/IndexService";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class ActModalPart extends AbstractModalPart {
	private _acts: ActInterface[];
	private _actEl: HTMLSelectElement;
	private _actErrorEl: HTMLParagraphElement;
	private _childEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);

		this._acts = this.api.database.read<ActInterface>(
			(component: ActInterface) =>
				component.index.type === ComponentType.Act &&
				component.index.campaignId === this.modal.campaignId &&
				component.index.adventureId === this.modal.adventureId
		);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const actEl = contentEl.createDiv({cls: 'actContainer'});

		if (this.modal.type === ComponentType.Act) {
			this.addAdditionalElements();
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
		this.modal.sceneModal = this.api.modals.getPartial(
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
		if (this.modal.actId === undefined)
			this.modal.actId = this.api.service(IndexService).createUUID();

		return true;
	}

	private _selectActElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'rpg-manager-modal-grid-navigation-group clearfix'});
		groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-title', text: 'Act'});
		const selectionContainerEl = groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-container'});
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
				value: act.index.actId?.toString(),
			});

			if (this._acts.length === 1 || this.modal.actId === act.index.actId){
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
		this.modal.actId = this._actEl.value;

		this._childEl.empty();
		this.loadChild(this._childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
