import {ComponentType} from "../../../core/enums/ComponentType";
import {SessionInterface} from "../interfaces/SessionInterface";
import {AbstractModalPart} from "../../../api/modalsManager/abstracts/AbstractModalPart";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdService} from "../../../services/idService/IdService";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";

export class SessionModalPart extends AbstractModalPart {
	private _sessions: SessionInterface[];
	private _sessionEl: HTMLSelectElement;
	private _sessionErrorEl: HTMLParagraphElement;
	private _childEl: HTMLDivElement;
	private _synopsisEl: HTMLTextAreaElement;

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);
		this.modal.sessionId = this.api.service(IdService).create(ComponentType.Session, this.modal.campaignId.id);
		this.modal.sessionId.id = 0;
		this._sessions = this.api.database.readList<SessionInterface>(ComponentType.Session, this.modal.campaignId);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const sessionEl = contentEl.createDiv({cls: 'sessionContainer'});
		this.addAdditionalElements();
		this._addNewAdventureElements(sessionEl);
		this.modal.saver = this;
		this.modal.enableButton();
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
	}

	public validate(
	): boolean {
		if (this.modal.sessionId?.id === 0)
			this.modal.sessionId.id = 1;

		return true;
	}

	private _addNewAdventureElements(
		containerEl: HTMLElement,
	): void {
		this._sessions.forEach((session: SessionInterface) => {
			if (this.modal.sessionId !== undefined && (session.id.sessionId ?? 0) >= (this.modal.sessionId.id ?? 0)) {
				this.modal.sessionId.id = ((session.id.sessionId ?? 0) + 1);
			}
		});
	}

	private _selectSession(
	): void {
		if (this.modal.sessionId !== undefined){
			this.modal.sessionId.id = +this._sessionEl.value;
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
