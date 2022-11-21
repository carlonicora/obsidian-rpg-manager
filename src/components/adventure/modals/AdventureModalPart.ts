import {ComponentType} from "../../../core/enums/ComponentType";
import {AdventureInterface} from "../interfaces/AdventureInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {IndexService} from "../../../services/indexService/IndexService";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";

export class AdventureModalPart extends AbstractModalPart {
	private _adventures: AdventureInterface[];
	private _adventureEl: HTMLSelectElement;
	private _adventureErrorEl: HTMLParagraphElement;
	private _childEl: HTMLDivElement;
	private _synopsisEl: HTMLTextAreaElement;

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);

		if (this.modal.adventureId === undefined) {
			this.modal.adventureId = this.api.service(IndexService).create(ComponentType.Adventure, this.modal.campaignId.id);
			this.modal.adventureId.id = 0;
		}

		this._adventures = this.api.database.readList<AdventureInterface>(ComponentType.Adventure, this.modal.campaignId);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const adventureEl = contentEl.createDiv({cls: 'adventureContainer'});

		if (this.modal.type === ComponentType.Adventure){
			this.addAdditionalElements();
			this._addNewAdventureElements(adventureEl);
		} else {
			if (this._adventures.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Adventures missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager AdventureModel for the selected campaign. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first adventure for the campaign.'});
			} else {
				this._childEl = contentEl.createDiv({cls: 'child'});
				this._childEl.id = 'AdventureChild';
				this._selectAdventureElements(adventureEl);
			}

		}

		if (this.modal.type === ComponentType.Adventure){
			this.modal.saver = this;
			this.modal.enableButton();
		}
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
		this.modal.actModal = this.api.modals.getPartial(
			this.modal.campaignSetting,
			ComponentType.Act,
			this.modal,
		);

		this.modal.actModal.addElement(
			containerEl,
		);
	}

	public validate(
	): boolean {
		if (this.modal.adventureId?.id === 0)
			this.modal.adventureId.id = 1;

		return true;
	}

	private _addNewAdventureElements(
		containerEl: HTMLElement,
	): void {
		this._adventures.forEach((adventure: AdventureInterface) => {
			if (this.modal.adventureId !== undefined && (adventure.index.adventureId ?? 0) >= (this.modal.adventureId.id ?? 0)) {
				this.modal.adventureId.id = ((adventure.index.adventureId ?? 0) + 1);
			}
		});
	}

	private _selectAdventureElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'rpg-manager-modal-grid-navigation-group clearfix'});
		groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-title', text: 'Adventure'});
		const selectionContainerEl = groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-container'});
		this._adventureEl = selectionContainerEl.createEl('select');

		if (this._adventures.length > 1) {
			this._adventureEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this._adventures.forEach((adventure: AdventureInterface) => {
			const adventureOptionEl = this._adventureEl.createEl('option', {
				text: adventure.file.basename,
				value: adventure.index.adventureId?.toString(),
			});

			if (this._adventures.length === 1 || this.modal.adventureId?.id === adventure.index.adventureId){
				adventureOptionEl.selected = true;
				this._selectAdventure();
			}
		});

		this._adventureEl.addEventListener('change', (e: Event) => {
			this._selectAdventure();
		});

		this._adventureErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private _selectAdventure(
	): void {
		if (this.modal.adventureId !== undefined){
			this.modal.adventureId.id = +this._adventureEl.value;
		}
		this._childEl.empty();
		this.loadChild(this._childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		/*
		if (this.modal.additionalInformationEl.style.display !== 'block') {
			this.modal.additionalInformationEl.style.display = 'block';
			this.modal.additionalInformationEl.createEl('h2', {
				cls: 'rpgm-modal-title',
				text: 'Additional Information for the ' + ComponentType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('p', {text: 'Synopsis'});
		}
		*/
	}
}
