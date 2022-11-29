import {ComponentType} from "../../../core/enums/ComponentType";
import {AdventureInterface} from "../interfaces/AdventureInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {IndexService} from "../../../services/indexService/IndexService";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import i18next from "i18next";

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

		this._adventures = this.api.database.read<AdventureInterface>(
			(component: AdventureInterface) =>
				component.index.type === ComponentType.Adventure &&
				component.index.campaignId === this.modal.campaignId
		);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const adventureEl = contentEl.createDiv({cls: 'adventureContainer'});

		if (this.modal.type === ComponentType.Adventure){
			this.addAdditionalElements();
		} else {
			if (this._adventures.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text:
						i18next.t("creation_missing_parent", {
							ns: "elements",
							parent: i18next.t("adventures", {ns: "elements", count: 2}),
						}) ?? ''
				});
				mainContent.createSpan({cls: '', text:
						i18next.t("creation_missing_parent", {
							ns: "elements",
							type: i18next.t("adventure", {ns: "elements", count: 1}),
							parent: i18next.t("campaign", {ns: "elements", count: 1}),
							child: i18next.t("act", {ns: "elements", count: 1}),
						}) ?? ''
				});
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
		if (this.modal.adventureId === undefined)
			this.modal.adventureId = this.api.service(IndexService).createUUID();

		return true;
	}

	private _selectAdventureElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'rpg-manager-modal-grid-navigation-group clearfix'});
		groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-title', text: i18next.t("adventure", {ns: "elements", count: 1}) ?? ''});
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
				value: adventure.index.id.toString(),
			});

			if (this._adventures.length === 1 || this.modal.adventureId === adventure.index.id){
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
		this.modal.adventureId = this._adventureEl.value;

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
