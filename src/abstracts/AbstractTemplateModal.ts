import {CachedMetadata, Modal, TFile} from "obsidian";
import {Api} from "../Api";
import {DataType} from "../enums/DataType";

export interface RpgmElementInterface {
	type: DataType;
	id: number;
	name: string;
}

export class RpgmElement implements RpgmElementInterface {
	constructor(
		public type: DataType,
		public id: number,
		public name: string,
	) {
	}
}

export abstract class AbstractTemplateModal extends Modal {
	public confirm = false;
	public button: HTMLButtonElement;
	public title: HTMLInputElement;
	public titleError: HTMLParagraphElement;
	public createFrontMatterOnly: HTMLInputElement;

	public campaign: HTMLSelectElement;
	public campaignError: HTMLParagraphElement;
	public adventure: HTMLSelectElement;
	public adventureError: HTMLParagraphElement;
	public session: HTMLSelectElement;
	public sessionError: HTMLParagraphElement;

	protected campaigns: RpgmElementInterface[];
	protected adventures: RpgmElementInterface[];
	protected sessions: RpgmElementInterface[];
	protected scenes: RpgmElementInterface[];

	private newCampaignId = 1;
	private newAdventureId = 1;
	private newSessionId = 1;
	private newSceneId = 1;

	protected confirmed: boolean;

	constructor(
		protected api: Api,
		protected type: DataType,
		private create: boolean,
		private name: string|null,
	) {
		super(api.app);


		this.confirm = false;
	}

	onOpen() {
		super.onOpen();
		const {contentEl} = this;
		contentEl.addClass('rpgm-modal');

		this.initialiseCampaigns();

		if (this.campaigns.length < 1 && this.type !== DataType.Campaign){
			contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Main campaign missing'});
			contentEl.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager campaign yet. Before creating a ' + DataType[this.type] + ', please initialise your first campaign.'});
		} else {
			contentEl.createEl('h2', {cls: 'rpgm-modal-title', text: 'Create New ' + DataType[this.type]});
			contentEl.createEl('p', {text: 'Title of your new ' + DataType[this.type]});
			this.title = contentEl.createEl('input', {type: 'text'});
			if (this.name !== null) {
				this.title.value = this.name;
			}
			this.titleError = contentEl.createEl('p', {cls: 'error'});

			this.content(contentEl);

			const cfmo = contentEl.createDiv({cls: 'createFrontMatterOnly'});
			this.createFrontMatterOnly = cfmo.createEl('input', {type: 'checkbox'});
			this.createFrontMatterOnly.id = 'createFrontMatterOnly';

			const labelFrontMatterOnly = cfmo.createEl('label', {text: 'Create Frontmatter only'});
			labelFrontMatterOnly.htmlFor = 'createFrontMatterOnly';

			this.button = contentEl.createEl('button', {cls: 'mod-cta', text: 'Create'});

			this.button.addEventListener('click', (e: Event) => {
				this.confirmed = true;
				this.save();
			});
		}
	}

	protected abstract content(contentEl: HTMLElement): void;

	private save(
	): void {
		let validation = this.titleValidation();

		if (this.type !== DataType.Campaign) {
			validation = validation && this.campaignValidation();

			if (this.type === DataType.Session || this.type === DataType.Scene) {
				//validate adventure

				if (this.type === DataType.Scene) {
					//validate session
				}
			}
		}

		if (validation) {
			let campaignId = this.newCampaignId;
			let adventureId: number|null = this.newAdventureId;
			let sessionId: number|null = this.newSessionId;
			const sceneId: number|null = this.newSceneId;

			if (this.type !== DataType.Campaign){
				campaignId = +this.campaign.value;
			}

			if (this.type === DataType.Session || this.type === DataType.Scene){
				adventureId = +this.adventure.value;

				if (this.type === DataType.Scene){
					sessionId = +this.session.value;
				}
			}

			this.api.fileFactory.create(
				this.type,
				this.create,
				this.createFrontMatterOnly.checked,
				this.title.value,
				campaignId,
				adventureId,
				sessionId,
				sceneId,
			);

			this.close();
		}
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	private removeOptions(
		select: HTMLSelectElement,
	) {
		const L = select.options.length - 1
		for(let i = L; i >= 0; i--) {
			select.remove(i);
		}
	}

	protected titleValidation(
	): boolean {
		let response = true;
		this.titleError.style.display = 'none';

		if (this.title.value === ''){
			this.titleError.style.display = 'block';
			this.titleError.textContent = 'You must add a title for your ' + DataType[this.type];
			response = false;
		}

		return response;
	}

	protected initialiseCampaigns(
	):void {
		this.campaigns = [];

		this.api.app.vault.getFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (
				metadata !== null &&
				metadata.frontmatter != null &&
				metadata.frontmatter.tags != null &&
				metadata.frontmatter.tags.length > 0
			) {
				const tags = (typeof metadata.frontmatter.tags === 'string' ? [metadata.frontmatter.tags] : metadata.frontmatter.tags);

				tags.forEach((tag: string|object) => {
					if (typeof tag === 'string' && tag.startsWith(this.api.settings.campaignTag)) {
						const campaignId = +tag.substring(tag.lastIndexOf('/') + 1);
						if (campaignId >= this.newCampaignId){
							this.newCampaignId = campaignId+1;
						}
						this.campaigns.push(new RpgmElement(
							DataType.Campaign,
							campaignId,
							file.basename,
						));
					}
				});
			}
		});

		this.campaigns.sort((n1,n2) => {
			return n1.id - n2.id
		});
	}

	protected campaignBlock(
		contentEl: HTMLElement
	): void {
		contentEl.createEl('p', {text: 'Campaign'});
		this.campaign = contentEl.createEl('select');
		if (this.campaigns.length > 1) {
			this.campaign.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}
		this.campaigns.forEach((campaign: RpgmElementInterface) => {
			this.campaign.createEl('option', {
				text: campaign.name,
				value: campaign.id.toString(),
			}).selected = true;
		});

		this.campaign.addEventListener('change', (e: Event) => {
			this.initialiseAdventures();
		});

		this.campaignError = contentEl.createEl('p', {cls: 'error'});
	}

	protected campaignValidation(
	): boolean {
		let response = true;
		this.campaignError.style.display = 'none';
		if (this.campaign.value === '') {
			this.campaignError.style.display = 'block';
			this.campaignError.textContent = 'You must select a valid campaign for your ' + DataType[this.type];
			response = false;
		}

		return response;
	}

	protected initialiseAdventures(
	): void {
		this.newAdventureId = 1;
		this.adventures = [];

		this.api.app.vault.getFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (
				metadata !== null &&
				metadata.frontmatter != null &&
				metadata.frontmatter.tags != null &&
				metadata.frontmatter.tags.length > 0
			) {
				const tags = (typeof metadata.frontmatter.tags === 'string' ? [metadata.frontmatter.tags] : metadata.frontmatter.tags);

				tags.forEach((tag: string|object) => {
					if (typeof tag === 'string' && tag.startsWith(this.api.settings.adventureTag + '/' + this.campaign.value)) {
						const adventureId = +tag.substring(tag.lastIndexOf('/') + 1);
						if (adventureId >= this.newAdventureId) {
							this.newAdventureId = adventureId + 1;
						}
						this.adventures.push(new RpgmElement(
							DataType.Adventure,
							adventureId,
							file.basename,
						));
					}
				});
			}
		});

		this.adventures.sort((n1,n2) => {
			return n1.id - n2.id
		});
	}

	protected adventureBlock(
		contentEl: HTMLElement
	): void {
		contentEl.createEl('p', {text: 'Adventure'});
		this.adventure = contentEl.createEl('select');
		this.refreshAdventureBlock();

		this.adventure.addEventListener('change', (e: Event) => {
			this.initialiseSessions();
			this.refreshSessionBlock();
		});

		this.adventureError = contentEl.createEl('p', {cls: 'error'});
	}

	protected refreshAdventureBlock(
	): void {
		if (this.adventure != null) {
			this.removeOptions(this.adventure);
			this.adventures.forEach((adventure: RpgmElementInterface) => {
				this.adventure.createEl('option', {
					text: adventure.name,
					value: adventure.id.toString(),
				}).selected = true;
			});
		}
	}

	protected adventureValidation(
	): boolean {
		let response = true;
		this.adventureError.style.display = 'none';
		if (this.adventure.value === '') {
			this.adventureError.style.display = 'block';
			this.adventureError.textContent = 'You must select a valid adventure for your ' + DataType[this.type];
			response = false;
		}

		return response;
	}

	protected initialiseSessions(
	): void {
		this.newSessionId = 1;
		this.sessions = [];

		this.api.app.vault.getFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (
				metadata !== null &&
				metadata.frontmatter != null &&
				metadata.frontmatter.tags != null &&
				metadata.frontmatter.tags.length > 0
			) {
				const tags = (typeof metadata.frontmatter.tags === 'string' ? [metadata.frontmatter.tags] : metadata.frontmatter.tags);

				tags.forEach((tag: string|object) => {
					if (typeof tag === 'string' && tag.startsWith(this.api.settings.sessionTag + '/' + this.campaign.value + '/' + this.adventure.value)) {
						const sessionId = +tag.substring(tag.lastIndexOf('/') + 1);
						if (sessionId >= this.newSessionId) {
							this.newSessionId = sessionId + 1;
						}
						this.sessions.push(new RpgmElement(
							DataType.Session,
							sessionId,
							file.basename,
						));
					}
				});
			}
		});

		this.sessions.sort((n1,n2) => {
			return n1.id - n2.id
		});
	}

	protected sessionBlock(
		contentEl: HTMLElement
	): void {
		contentEl.createEl('p', {text: 'Session'});
		this.session = contentEl.createEl('select');
		this.refreshSessionBlock();

		this.session.addEventListener('change', (e: Event) => {
			this.initialiseScenes();
		});

		this.sessionError = contentEl.createEl('p', {cls: 'error'});
	}

	protected refreshSessionBlock(
	): void {
		if (this.session != null) {
			this.removeOptions(this.session);
			this.sessions.forEach((session: RpgmElementInterface) => {
				this.session.createEl('option', {
					text: session.name,
					value: session.id.toString(),
				}).selected = true;
			});
		}
	}

	protected sessionValidation(
	): boolean {
		let response = true;
		this.sessionError.style.display = 'none';
		if (this.session.value === '') {
			this.sessionError.style.display = 'block';
			this.sessionError.textContent = 'You must select a valid session for your ' + DataType[this.type];
			response = false;
		}

		return response;
	}

	protected initialiseScenes(
	): void {
		this.newSceneId = 1;
		this.scenes = [];

		this.api.app.vault.getFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (
				metadata !== null &&
				metadata.frontmatter != null &&
				metadata.frontmatter.tags != null &&
				metadata.frontmatter.tags.length > 0
			) {
				const tags = (typeof metadata.frontmatter.tags === 'string' ? [metadata.frontmatter.tags] : metadata.frontmatter.tags);

				tags.forEach((tag: string|object) => {
					if (typeof tag === 'string' && tag.startsWith(this.api.settings.sceneTag + '/' + this.campaign.value + '/' + this.adventure.value + '/' + this.session.value)) {
						const sceneId = +tag.substring(tag.lastIndexOf('/') + 1);
						if (sceneId >= this.newSceneId) {
							this.newSceneId = sceneId + 1;
						}
						this.scenes.push(new RpgmElement(
							DataType.Scene,
							sceneId,
							file.basename,
						));
					}
				});
			}
		});

		this.scenes.sort((n1,n2) => {
			return n1.id - n2.id
		});
	}
}
