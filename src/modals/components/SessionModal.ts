import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {RecordType} from "../../enums/RecordType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {SessionInterface} from "../../interfaces/data/SessionInterface";

export class SessionModal extends AbstractModalComponent {
	private sessions: SessionInterface[];

	private sessionEl: HTMLSelectElement;
	private sessionErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;
	private synopsisEl: HTMLTextAreaElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);
		this.modal.sessionId = this.factories.id.create(RecordType.Session, this.modal.campaignId.id);
		this.modal.sessionId.id = 1;

		this.sessions = this.database.readList<SessionInterface>(RecordType.Session, this.modal.campaignId);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const sessionEl = contentEl.createDiv({cls: 'sessionContainer'});

		this.addAdditionalElements();
		this.addNewAdventureElements(sessionEl);

		this.modal.saver = this;
		this.modal.enableButton();
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
	}

	public validate(
	): boolean {
		return true;
	}

	private addNewAdventureElements(
		containerEl: HTMLElement,
	): void {
		this.sessions.forEach((session: SessionInterface) => {
			if (this.modal.sessionId !== undefined && session.sessionId >= (this.modal.sessionId.id ?? 0)) {
				this.modal.sessionId.id = (session.sessionId + 1);
			}
		});
	}

	private selectSession(
	): void {
		if (this.modal.sessionId !== undefined){
			this.modal.sessionId.id = +this.sessionEl.value;
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
				text: 'Additional Information for the ' + RecordType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('p', {text: 'Synopsis'});
		}
		*/
	}
}
