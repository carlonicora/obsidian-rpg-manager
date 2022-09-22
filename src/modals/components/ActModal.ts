import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {RecordType} from "../../enums/RecordType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {ActInterface} from "../../interfaces/data/ActInterface";

export class ActModal extends AbstractModalComponent {
	private acts: ActInterface[];
	private allAct:ActInterface[];

	private actEl: HTMLSelectElement;
	private actErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		this.modal.actId = this.factories.id.create(RecordType.Act, this.modal.campaignId.id, this.modal.adventureId?.id);
		this.modal.actId.id = 1;

		this.allAct = this.database.read<ActInterface>(
			(record: ActInterface) =>
				record.id.type === RecordType.Act &&
				record.id.campaignId === this.modal.campaignId.id
		);

		this.acts = this.database.read<ActInterface>(
			(record: ActInterface) =>
				record.id.type === RecordType.Act &&
				record.id.campaignId === this.modal.campaignId.id &&
				record.id.adventureId === this.modal.adventureId?.id
		);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const actEl = contentEl.createDiv({cls: 'actContainer'});

		if (this.modal.type === RecordType.Act){
			this.addNewActElements(actEl);
		} else {
			if (this.acts.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Acts missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager Act for the selected adventure. Before creating a ' + RecordType[this.modal.type] + ', please initialise your first act for the adventure.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'ActChild';

				this.selectActElements(actEl);
			}

		}

		if (this.modal.type === RecordType.Act){
			this.modal.saver = this;
			this.modal.enableButton();
		}
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
		this.modal.sceneModal = this.factories.modals.create(
			this.modal.campaignSetting,
			RecordType.Scene,
			this.modal,
		);

		this.modal.sceneModal.addElement(
			containerEl,
		);
	}

	public validate(
	): boolean {
		return true;
	}

	private addNewActElements(
		containerEl: HTMLElement,
	): void {
		this.allAct.forEach((data: ActInterface) => {
			if (this.modal.actId !== undefined && data.actId >= (this.modal.actId.id ?? 0)) {
				this.modal.actId.id = (data.actId + 1);
			}
		});
	}

	private selectActElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'group'});

		groupElement.createDiv({cls: 'title', text: 'Act'});
		const selectionContainerEl = groupElement.createDiv({cls: 'container'});
		groupElement.createDiv({cls: 'clear'});

		this.actEl = selectionContainerEl.createEl('select');

		if (this.acts.length > 1) {
			this.actEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this.acts.forEach((act: ActInterface) => {
			const actOptionEl = this.actEl.createEl('option', {
				text: act.name,
				value: act.actId.toString(),
			});

			if (this.acts.length === 1){
				actOptionEl.selected = true;
				this.selectAct();
			}
		});

		this.actEl.addEventListener('change', (e: Event) => {
			this.selectAct();
		});

		this.actErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private selectAct(
	): void {
		if (this.modal.actId === undefined) {
			this.modal.actId = this.factories.id.create(RecordType.Adventure, this.modal.campaignId.id, this.modal.adventureId?.id);
		}

		if (this.modal.actId !== undefined){
			this.modal.actId.id = +this.actEl.value;
		}

		this.childEl.empty();
		this.loadChild(this.childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
