import {AbstractModalPart} from "../../../../modals/abstracts/AbstractModalPart";
import {ComponentType} from "../../../enums/ComponentType";
import {App} from "obsidian";
import {ModalInterface} from "../../../../modals/interfaces/ModalInterface";
import {SessionInterface} from "../interfaces/SessionInterface";

export class SessionModalPart extends AbstractModalPart {
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
		this.modal.sessionId = this.factories.id.create(ComponentType.Session, this.modal.campaignId.id);
		this.modal.sessionId.id = 0;

		this.sessions = this.database.readList<SessionInterface>(ComponentType.Session, this.modal.campaignId);
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
		if (this.modal.sessionId?.id === 0) this.modal.sessionId.id = 1;
		return true;
	}

	private addNewAdventureElements(
		containerEl: HTMLElement,
	): void {
		this.sessions.forEach((session: SessionInterface) => {
			if (this.modal.sessionId !== undefined && (session.id.sessionId ?? 0) >= (this.modal.sessionId.id ?? 0)) {
				this.modal.sessionId.id = ((session.id.sessionId ?? 0) + 1);
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
				text: 'Additional Information for the ' + ComponentType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('p', {text: 'Synopsis'});
		}
		*/
	}
}
