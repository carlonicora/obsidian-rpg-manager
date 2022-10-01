import {AbstractModalPart} from "../../abstracts/AbstractModalPart";
import {ComponentType} from "../../enums/ComponentType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {ActV2Interface} from "../../_dbV2/components/interfaces/ActV2Interface";

export class ActModalPart extends AbstractModalPart {
	private acts: ActV2Interface[];
	private allAct:ActV2Interface[];

	private actEl: HTMLSelectElement;
	private actErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		if (this.modal.actId === undefined) {
			this.modal.actId = this.factories.id.create(ComponentType.Act, this.modal.campaignId.id, this.modal.adventureId?.id);
			this.modal.actId.id = 1;
		}

		this.allAct = this.database.read<ActV2Interface>(
			(component: ActV2Interface) =>
				component.id.type === ComponentType.Act &&
				component.id.campaignId === this.modal.campaignId.id
		);

		this.acts = this.database.read<ActV2Interface>(
			(component: ActV2Interface) =>
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
			this.addNewActElements(actEl);
		} else {
			if (this.acts.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Acts missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager Act for the selected adventure. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first act for the adventure.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'ActChild';

				this.selectActElements(actEl);
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
		return true;
	}

	private addNewActElements(
		containerEl: HTMLElement,
	): void {
		this.allAct.forEach((component: ActV2Interface) => {
			if (this.modal.actId !== undefined && (component.id.actId ?? 0) >= (this.modal.actId.id ?? 0)) {
				this.modal.actId.id = ((component.id.actId ?? 0) + 1);
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

		this.acts.forEach((act: ActV2Interface) => {
			const actOptionEl = this.actEl.createEl('option', {
				text: act.file.basename,
				value: act.id.actId?.toString(),
			});

			if (this.acts.length === 1 || this.modal.actId?.id === act.id.actId){
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
			this.modal.actId = this.factories.id.create(ComponentType.Adventure, this.modal.campaignId.id, this.modal.adventureId?.id);
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
