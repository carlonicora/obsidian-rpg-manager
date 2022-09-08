import {App, Modal} from "obsidian";
import {DataType} from "./enums/DataType";
import {ModalComponentInterface} from "./interfaces/ModalComponentInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ModalInterface} from "./interfaces/ModalInterface";

export class RpgModal extends Modal implements ModalInterface {
	public saver: ModalComponentInterface;

	public button: HTMLButtonElement;
	public title: HTMLInputElement;
	public titleError: HTMLParagraphElement;
	public createFrontMatterOnly: HTMLInputElement;

	public campaignId: number;
	public adventureId: number|null;
	public sessionId: number|null;
	public sceneId: number|null;
	public settings: CampaignSetting = CampaignSetting.Agnostic;

	public campaignModal: ModalComponentInterface;
	public adventureModal: ModalComponentInterface;
	public sessionModal: ModalComponentInterface;
	public sceneModal: ModalComponentInterface;
	public elementModal: ModalComponentInterface;

	constructor(
		public app: App,
		public type: DataType,
		private create: boolean = true,
		private name: string|null = null,
		campaignId: number|null = null,
		adventureId: number|null = null,
		sessionId: number|null = null,
	) {
		super(app);

		if (campaignId != null) this.campaignId = campaignId;
		if (adventureId != null) this.adventureId = adventureId;
		if (sessionId != null) this.sessionId = sessionId;
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Create New ' + DataType[this.type]});
		contentEl.createEl('p', {text: 'Title of your new ' + DataType[this.type]});
		this.title = contentEl.createEl('input', {type: 'text'});
		if (this.name !== null) {
			this.title.value = this.name;
		}
		this.titleError = contentEl.createEl('p', {cls: 'error'});

		this.campaignModal = this.app.plugins.getPlugin('rpg-manager').factories.modals.create(
			this.settings,
			DataType.Campaign,
			this,
		)

		const childElement = contentEl.createDiv();

		const cfmo = contentEl.createDiv({cls: 'createFrontMatterOnly'});
		this.createFrontMatterOnly = cfmo.createEl('input', {type: 'checkbox'});
		this.createFrontMatterOnly.id = 'createFrontMatterOnly';

		const labelFrontMatterOnly = contentEl.createEl('label', {text: 'Create Frontmatter only'});
		labelFrontMatterOnly.htmlFor = 'createFrontMatterOnly';

		this.button = contentEl.createEl('button', {cls: 'mod-cta', text: 'Create'});

		if (this.type !== DataType.Campaign){
			this.button.disabled = true;
		}

		this.button.addEventListener('click', (e: Event) => {
			this.save();
		});

		this.campaignModal.addElement(
			childElement,
		)
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}

	private async save(
	): Promise<void> {
		if (this.title.value === ''){
			this.titleError.style.display = 'block';
			return;
		}
		if (!this.campaignModal.validate()) return;
		if (this.adventureModal != null && !this.adventureModal.validate()) return;
		if (this.sessionModal != null && !this.sessionModal.validate()) return;
		if (this.sceneModal != null && !this.sceneModal.validate()) return;
		if (this.elementModal != null && !this.elementModal.validate()) return;

		this.saver.save(
			this.settings,
			this.type,
			this.create,
			this.createFrontMatterOnly.checked,
			this.title.value,
			this.campaignId,
			this.adventureId,
			this.sessionId,
			this.sceneId,
		)
		this.close();
	}

	public enableButton() {
		this.button.disabled = false;
	}

	public getContentEl(
	): HTMLElement {
		const {contentEl} = this;
		return contentEl;
	}
}
