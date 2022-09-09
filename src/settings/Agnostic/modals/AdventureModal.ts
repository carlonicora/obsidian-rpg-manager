import {AbstractModalComponent} from "../../../abstracts/AbstractModalComponent";
import {DataType} from "../../../enums/DataType";
import {App} from "obsidian";
import {ModalInterface} from "../../../interfaces/ModalInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {EditorView} from "@codemirror/view";

export class AdventureModal extends AbstractModalComponent {
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

		this.adventures = this.app.plugins.getPlugin('rpg-manager').io.getAdventureList(this.modal.campaignId).elements as AdventureInterface[];
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const adventureEl = contentEl.createDiv({cls: 'adventureContainer'});

		if (this.modal.type === DataType.Adventure){
			this.addAdditionalElements();
			this.addNewAdventureElements(adventureEl);
		} else {
			if (this.adventures.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Adventures missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager Adventure for the selected campaign. Before creating a ' + DataType[this.modal.type] + ', please initialise your first adventure for the campaign.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'AdventureChild';

				this.selectAdventureElements(adventureEl);
			}

		}

		if (this.modal.type === DataType.Adventure){
			this.modal.saver = this;
			this.modal.enableButton();
		}
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
		this.modal.sessionModal = this.app.plugins.getPlugin('rpg-manager').factories.modals.create(
			this.modal.settings,
			DataType.Session,
			this.modal,
		);

		this.modal.sessionModal.addElement(
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
		this.modal.adventureId = 1;
		this.adventures.forEach((data: AdventureInterface) => {
			if (data.adventureId >= (this.modal.adventureId ?? 0)) this.modal.adventureId = (data.adventureId + 1);
		});
	}

	private selectAdventureElements(
		containerEl: HTMLElement
	): void {
		containerEl.createDiv({cls: 'title', text: 'Adventure'});
		const selectionContainerEl = containerEl.createDiv({cls: 'container'});
		containerEl.createDiv({cls: 'clear'});

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

			if (this.adventures.length === 1){
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
		this.modal.adventureId = +this.adventureEl.value;
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
				text: 'Additional Information for the ' + DataType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('p', {text: 'Synopsis'});

			this.app.workspace.
			const editorEl = this.modal.additionalInformationEl.createDiv('editor');
			let editor = new EditorView({
				parent: editorEl,
			})
			//this.synopsisEl = this.modal.additionalInformationEl.createEl('textarea');
		}
		*/
	}
}
