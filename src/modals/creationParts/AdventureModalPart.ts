import {AbstractModalPart} from "../../abstracts/AbstractModalPart";
import {ComponentType} from "../../enums/ComponentType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {AdventureInterface} from "../../interfaces/components/AdventureInterface";

export class AdventureModalPart extends AbstractModalPart {
	private adventures: AdventureInterface[];

	private adventureEl: HTMLSelectElement;
	private adventureErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;
	private synopsisEl: HTMLTextAreaElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);
		if (this.modal.adventureId === undefined) {
			this.modal.adventureId = this.factories.id.create(ComponentType.Adventure, this.modal.campaignId.id);
			this.modal.adventureId.id = 1;
		}

		this.adventures = this.database.readList<AdventureInterface>(ComponentType.Adventure, this.modal.campaignId);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const adventureEl = contentEl.createDiv({cls: 'adventureContainer'});

		if (this.modal.type === ComponentType.Adventure){
			this.addAdditionalElements();
			this.addNewAdventureElements(adventureEl);
		} else {
			if (this.adventures.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Adventures missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager Adventure for the selected campaign. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first adventure for the campaign.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'AdventureChild';

				this.selectAdventureElements(adventureEl);
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
		this.modal.actModal = this.factories.modals.create(
			this.modal.campaignSetting,
			ComponentType.Act,
			this.modal,
		);

		this.modal.actModal.addElement(
			containerEl,
		)
	}

	public validate(
	): boolean {
		return true;
	}

	private addNewAdventureElements(
		containerEl: HTMLElement,
	): void {
		this.adventures.forEach((adventure: AdventureInterface) => {
			if (this.modal.adventureId !== undefined && adventure.adventureId >= (this.modal.adventureId.id ?? 0)) {
				this.modal.adventureId.id = (adventure.adventureId + 1);
			}
		});
	}

	private selectAdventureElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'group'});

		groupElement.createDiv({cls: 'title', text: 'Adventure'});
		const selectionContainerEl = groupElement.createDiv({cls: 'container'});
		groupElement.createDiv({cls: 'clear'});

		this.adventureEl = selectionContainerEl.createEl('select');
		if (this.adventures.length > 1) {
			this.adventureEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this.adventures.forEach((adventure: AdventureInterface) => {
			const adventureOptionEl = this.adventureEl.createEl('option', {
				text: adventure.name,
				value: adventure.adventureId.toString(),
			});

			if (this.adventures.length === 1 || this.modal.adventureId?.id === adventure.adventureId){
				adventureOptionEl.selected = true;
				this.selectAdventure();
			}
		});

		this.adventureEl.addEventListener('change', (e: Event) => {
			this.selectAdventure();
		});

		this.adventureErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private selectAdventure(
	): void {
		if (this.modal.adventureId !== undefined){
			this.modal.adventureId.id = +this.adventureEl.value;
		}
		this.childEl.empty();
		this.loadChild(this.childEl);
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
