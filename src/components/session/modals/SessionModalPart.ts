import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../../../services/indexService/IndexService";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";

export class SessionModalPart extends AbstractModalPart {
	private _sessionEl: HTMLSelectElement;
	private _sessionErrorEl: HTMLParagraphElement;
	private _childEl: HTMLDivElement;
	private _synopsisEl: HTMLTextAreaElement;

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		contentEl.createDiv({cls: 'sessionContainer'});
		this.addAdditionalElements();
		this.modal.saver = this;
		this.modal.enableButton();
	}

	public async loadChild(
		containerEl: HTMLElement,
	): Promise<void> {
	}

	public validate(
	): boolean {
		if (this.modal.sessionId === undefined)
			this.modal.sessionId = this.api.service(IndexService).createUUID();

		return true;
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
