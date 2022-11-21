import {CachedMetadata, MarkdownView, Modal, Scope, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {IndexService} from "../../services/indexService/IndexService";
import {TagService} from "../../services/tagService/TagService";
import {ComponentNotesInterface} from "../../managers/templatesManager/interfaces/ComponentNotesInterface";

export class CreationModal extends Modal implements ModalInterface {
	public saver: ModalPartInterface;

	public button: HTMLButtonElement;
	public title: HTMLInputElement;
	public titleError: HTMLParagraphElement;
	public createFrontMatterOnly: HTMLInputElement;
	public additionalInformationEl: HTMLDivElement;
	public templateEl: HTMLSelectElement;

	public campaignId: IndexInterface;
	public adventureId: IndexInterface|undefined;
	public actId: IndexInterface|undefined;
	public sceneId: IndexInterface|undefined;
	public sessionId: IndexInterface|undefined;
	public campaignSetting: CampaignSetting = CampaignSetting.Agnostic;

	public campaignModal: ModalPartInterface;
	public adventureModal: ModalPartInterface;
	public actModal: ModalPartInterface;
	public sceneModal: ModalPartInterface;
	public sessionModal: ModalPartInterface;
	public elementModal: ModalPartInterface;

	public availableSpecificTemplates: TFile[] = [];
	public availableGenericTemplates: TFile[] = [];

	private _internalTemplates: Map<ComponentType, ComponentNotesInterface>;

	constructor(
		public api: RpgManagerApiInterface,
		public type: ComponentType,
		private _create: boolean = true,
		private _name: string|null = null,
		campaignId: number|undefined = undefined,
		adventureId: number|undefined = undefined,
		actId: number|undefined = undefined,
	) {
		super(app);

		this.scope = new Scope();

		this.scope.register([], "Escape", evt => {
			evt.preventDefault();
		});

		if (campaignId !== undefined) {
			const campaign:IndexInterface|undefined = this.api.service(IndexService).create(ComponentType.Campaign, campaignId);
			if (campaign !== undefined) {
				this.campaignId = campaign;

				if (adventureId !== undefined) {
					this.adventureId = this.api.service(IndexService).create(ComponentType.Adventure, campaignId, adventureId);

					if (actId !== undefined) this.actId = this.api.service(IndexService).create(ComponentType.Act, campaignId, adventureId, actId);
				}
			}
		}

		this.app.vault.getFiles()
			.filter((file: TFile) =>
				file.parent.path === this.app.plugins.getPlugin('rpg-manager').settings.templateFolder
			)
			.forEach((file: TFile) => {
				const metadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
				if (metadata != null) {
					const tags = this.api.service(TagService).sanitiseTags(metadata.frontmatter?.tags);
					if (tags.length > 0) {
						const tags = this.api.service(TagService).sanitiseTags(metadata.frontmatter?.tags);
						const templateType = this.api.service(TagService).getTemplateDataType(tags);
						if (templateType == undefined) this.availableGenericTemplates.push(file);
						if (templateType === this.type) this.availableSpecificTemplates.push(file);
					} else {
						this.availableGenericTemplates.push(file);
					}
				}
			});

	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpg-manager-modal');

		if (!this._create && this.app.workspace.getActiveViewOfType(MarkdownView) == null){
			contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Error'});
			contentEl.createSpan({cls: '', text: 'To fill a note with a RPG Manager element you must have a valid file opened.'});
			return;
		}
		//Modal Title
		contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Create New ' + ComponentType[this.type]});

		//Navigation & Additional Info
		const gridEl = contentEl.createDiv({cls: 'rpg-manager-modal-grid'});
		const navigationEl = gridEl.createDiv({cls: 'rpg-manager-modal-grid-navigation'});
		this.additionalInformationEl = gridEl.createDiv({cls: 'rpg-manager-modal-grid-additional-elements'});

		//Title Input
		const titleEl = navigationEl.createDiv({cls: 'rpgm-input-title'});
		titleEl.createEl('label', {text: 'Title of your new ' + ComponentType[this.type]});
		this.title = titleEl.createEl('input', {type: 'text'});
		if (this._name !== null) {
			this.title.value = this._name;
		}
		this.titleError = navigationEl.createEl('p', {cls: 'error', text: 'Please specify a valid title'});

		//Template Selection
		const selectionTitleEl = navigationEl.createDiv({cls: 'rpgm-input-title'});
		selectionTitleEl.createEl('label', {text: 'Template to use'});
		this.templateEl = selectionTitleEl.createEl('select');
		this.templateEl.createEl('option', {
			text: '',
			value: '',
		});

		this.templateEl.createEl('option', {
			text: 'RpgManager default ' + ComponentType[this.type] + ' template',
			value: 'internal' + ComponentType[this.type],
		}).selected = true;

		this.templateEl.createEl('option', {
			text: '',
			value: '',
		});

		if (this.availableSpecificTemplates.length > 0) {
			const templateOptionEl = this.templateEl.createEl('option', {
				text: ComponentType[this.type] + '-specific frontmatter',
			});
			templateOptionEl.disabled = true;
			this.availableSpecificTemplates.forEach((file: TFile) => {
				this.templateEl.createEl('option', {
					text: file.basename,
					value: file.path,
				});
			});
			this.templateEl.createEl('option', {
				text: '',
				value: '',
			});
		}
		if (this.availableGenericTemplates.length > 0){

			const templateOptionEl = this.templateEl.createEl('option', {
				text: 'Generic frontmatter',
			});
			templateOptionEl.disabled = true;
			this.availableGenericTemplates.forEach((file: TFile) => {
				this.templateEl.createEl('option', {
					text: file.basename,
					value: file.path,
				});
			});
		}

		this.campaignModal = this.api.modals.getPartial(
			this.campaignSetting,
			ComponentType.Campaign,
			this,
		);

		const childElement = navigationEl.createDiv();

		//Create Button
		this.button = contentEl.createEl('button', {cls: 'mod-cta', text: 'Create'});

		if (this.type !== ComponentType.Campaign){
			this.button.disabled = true;
		}

		this.button.addEventListener('click', (e: Event) => {
			this._save();
		});

		this.campaignModal.addElement(
			childElement,
		);

		titleEl.addEventListener("keypress", function(event: KeyboardEvent) {
			if (event.key === "Enter") this.button.click();
		}.bind(this));
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}

	private async _save(
	): Promise<void> {
		if (this.title.value === ''){
			this.titleError.style.display = 'block';
			return;
		}
		if (!this.campaignModal.validate()) return;
		if (this.adventureModal != null && !this.adventureModal.validate()) return;
		if (this.actModal != null && !this.actModal.validate()) return;
		if (this.sceneModal != null && !this.sceneModal.validate()) return;
		if (this.sessionModal != null && !this.sessionModal.validate()) return;
		if (this.elementModal != null && !this.elementModal.validate()) return;

		this.saver.save(
			this.campaignSetting,
			this.type,
			this._create,
			this.templateEl.value,
			this.title.value,
			this.campaignId,
			this.adventureId,
			this.actId,
			this.sceneId,
			this.sessionId,
			this.saver.prepareAdditionalInformation(),
		);
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
