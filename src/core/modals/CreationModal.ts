import {CachedMetadata, MarkdownView, Modal, Scope, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ModalInterface} from "../interfaces/ModalInterface";
import {ModalPartInterface} from "../interfaces/ModalPartInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
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

	public campaignId: string;
	public adventureId?: string;
	public actId?: string;
	public sceneId?: string;
	public sessionId?: string;
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
		campaignId?: string,
		parentId?: string,
	) {
		super(app);

		this.scope = new Scope();

		this.scope.register([], "Escape", evt => {
			evt.preventDefault();
		});

		if (campaignId !== undefined) {
			this.campaignId = campaignId;

			if (parentId !== undefined) {
				if (type === ComponentType.Act) {
					this.adventureId = parentId;
				}

				if (type === ComponentType.Scene) {
					this.actId = parentId;
					try {
						const act = this.api.database.readById(parentId);
						this.adventureId = act.index.parentId;
					} catch (e) {
						//no need to do anything here
					}
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
