import {App, CachedMetadata, MarkdownView, TFile} from "obsidian";
import {DataType} from "../enums/DataType";
import {ModalComponentInterface} from "../interfaces/ModalComponentInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {ModalInterface} from "../interfaces/ModalInterface";
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {IdInterface} from "../interfaces/data/IdInterface";

export class CreationModal extends AbstractRpgManagerModal implements ModalInterface {
	public saver: ModalComponentInterface;

	public button: HTMLButtonElement;
	public title: HTMLInputElement;
	public titleError: HTMLParagraphElement;
	public createFrontMatterOnly: HTMLInputElement;
	public additionalInformationEl: HTMLDivElement;
	public templateEl: HTMLSelectElement;

	public campaignId: IdInterface;
	public adventureId: IdInterface|undefined;
	public sessionId: IdInterface|undefined;
	public sceneId: IdInterface|undefined;
	public campaignSetting: CampaignSetting = CampaignSetting.Agnostic;

	public campaignModal: ModalComponentInterface;
	public adventureModal: ModalComponentInterface;
	public sessionModal: ModalComponentInterface;
	public sceneModal: ModalComponentInterface;
	public elementModal: ModalComponentInterface;

	public availableSpecificTemplates: Array<TFile> = [];
	public availableGenericTemplates: Array<TFile> = [];

	private internalTemplates: Map<DataType, TemplateInterface>;

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

		if (campaignId != null) {
			const campaign:IdInterface|undefined = this.factories.id.create(DataType.Campaign, campaignId);
			if (campaign !== undefined) {
				this.campaignId = campaign;

				if (adventureId != null) {
					this.adventureId = this.factories.id.create(DataType.Adventure, campaignId, adventureId);

					if (sessionId != null) this.sessionId = this.factories.id.create(DataType.Adventure, campaignId, adventureId, sessionId);
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
					const tags = this.tagHelper.sanitiseTags(metadata.frontmatter?.tags);
					if (tags.length > 0) {
						const tags = this.tagHelper.sanitiseTags(metadata.frontmatter?.tags);
						const templateType = this.tagHelper.getTemplateDataType(tags);
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
		contentEl.addClass('rpgm-modal');

		if (!this.create && this.app.workspace.getActiveViewOfType(MarkdownView) == null){
			contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Error'});
			contentEl.createSpan({cls: '', text: 'To fill a note with a RPG Manager element you must have a valid file opened.'});
			return;
		}
		//Modal Title
		contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Create New ' + DataType[this.type]});

		//Navigation & Additional Info
		const gridEl = contentEl.createDiv({cls: 'rpgm-grid'})
		const navigationEl = gridEl.createDiv({cls: 'navigation'});
		this.additionalInformationEl = gridEl.createDiv({cls: 'additionalElements'});

		//Title Input
		const titleEl = navigationEl.createDiv({cls: 'rpgm-input-title'})
		titleEl.createEl('label', {text: 'Title of your new ' + DataType[this.type]});
		this.title = titleEl.createEl('input', {type: 'text'});
		if (this.name !== null) {
			this.title.value = this.name;
		}
		this.titleError = navigationEl.createEl('p', {cls: 'error', text: 'Please specify a valid title'});

		//Template Selection
		const selectionTitleEl = navigationEl.createDiv({cls: 'rpgm-input-title'})
		selectionTitleEl.createEl('label', {text: 'Template to use'});
		this.templateEl = selectionTitleEl.createEl('select');
		this.templateEl.createEl('option', {
			text: '',
			value: '',
		});


		this.templateEl.createEl('option', {
			text: 'RpgManager default ' + DataType[this.type] + ' template',
			value: 'internal' + DataType[this.type],
		}).selected = true;

		this.templateEl.createEl('option', {
			text: '',
			value: '',
		})

		if (this.availableSpecificTemplates.length > 0) {
			const templateOptionEl = this.templateEl.createEl('option', {
				text: DataType[this.type] + '-specific templates',
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
				text: 'Generic templates',
			});
			templateOptionEl.disabled = true;
			this.availableGenericTemplates.forEach((file: TFile) => {
				this.templateEl.createEl('option', {
					text: file.basename,
					value: file.path,
				});
			});
		}

		this.campaignModal = this.app.plugins.getPlugin('rpg-manager').factories.modals.create(
			this.campaignSetting,
			DataType.Campaign,
			this,
		)

		const childElement = navigationEl.createDiv();


		//Create Button
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
			this.campaignSetting,
			this.type,
			this.create,
			this.templateEl.value,
			this.title.value,
			this.campaignId.id,
			this.adventureId?.id,
			this.sessionId?.id,
			this.sceneId?.id,
			this.saver.prepareAdditionalInformation(),
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
