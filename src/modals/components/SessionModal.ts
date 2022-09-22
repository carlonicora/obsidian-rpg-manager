import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {RecordType} from "../../enums/RecordType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {SessionInterface} from "../../interfaces/data/SessionInterface";

export class SessionModal extends AbstractModalComponent {
	private sessions: SessionInterface[];
	private allSession:SessionInterface[];

	private sessionEl: HTMLSelectElement;
	private sessionErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		console.log(RecordType[this.modal.type]);
		this.modal.sessionId = this.factories.id.create(RecordType.Session, this.modal.campaignId.id, this.modal.adventureId?.id);
		this.modal.sessionId.id = 1;

		this.allSession = this.database.read<SessionInterface>(
			(record: SessionInterface) =>
				record.id.type === RecordType.Session &&
				record.id.campaignId === this.modal.campaignId.id
		);

		this.sessions = this.database.read<SessionInterface>(
			(record: SessionInterface) =>
				record.id.type === RecordType.Session &&
				record.id.campaignId === this.modal.campaignId.id &&
				record.id.adventureId === this.modal.adventureId?.id
		);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const sessionEl = contentEl.createDiv({cls: 'sessionContainer'});

		if (this.modal.type === RecordType.Session){
			this.addNewSessionElements(sessionEl);
		} else {
			if (this.sessions.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Sessions missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager Session for the selected adventure. Before creating a ' + RecordType[this.modal.type] + ', please initialise your first session for the adventure.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'SessionChild';

				this.selectSessionElements(sessionEl);
			}

		}

		if (this.modal.type === RecordType.Session){
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

	private addNewSessionElements(
		containerEl: HTMLElement,
	): void {
		this.allSession.forEach((data: SessionInterface) => {
			if (this.modal.sessionId !== undefined && data.sessionId >= (this.modal.sessionId.id ?? 0)) {
				this.modal.sessionId.id = (data.sessionId + 1);
			}
		});
	}

	private selectSessionElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'group'});

		groupElement.createDiv({cls: 'title', text: 'Session'});
		const selectionContainerEl = groupElement.createDiv({cls: 'container'});
		groupElement.createDiv({cls: 'clear'});

		this.sessionEl = selectionContainerEl.createEl('select');

		if (this.sessions.length > 1) {
			this.sessionEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this.sessions.forEach((session: SessionInterface) => {
			const sessionOptionEl = this.sessionEl.createEl('option', {
				text: session.name,
				value: session.sessionId.toString(),
			});

			if (this.sessions.length === 1){
				sessionOptionEl.selected = true;
				this.selectSession();
			}
		});

		this.sessionEl.addEventListener('change', (e: Event) => {
			this.selectSession();
		});

		this.sessionErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private selectSession(
	): void {
		if (this.modal.sessionId === undefined) {
			this.modal.sessionId = this.factories.id.create(RecordType.Adventure, this.modal.campaignId.id, this.modal.adventureId?.id);
		}

		if (this.modal.sessionId !== undefined){
			this.modal.sessionId.id = +this.sessionEl.value;
		}

		this.childEl.empty();
		this.loadChild(this.childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		//this.modal.additionalInformationEl
	}
}
