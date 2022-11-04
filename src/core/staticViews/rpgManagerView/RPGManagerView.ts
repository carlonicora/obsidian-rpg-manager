import {ComponentType} from "../../enums/ComponentType";
import {CreationModal} from "../../modals/CreationModal";
import {setIcon, TFile} from "obsidian";
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {AbstractStaticView} from "../../../managers/staticViewsManager/abstracts/AbstractStaticView";
import {StaticViewType} from "../../../managers/staticViewsManager/enums/StaticViewType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export class RPGManagerView extends AbstractStaticView {
	protected viewType: string = StaticViewType.RPGManager.toString();
	protected displayText = 'RPG Manager';
	public icon = 'd20';
	private _hasCampaigns: boolean;

	private _currentCampaign: CampaignInterface|undefined;
	private _currentComponent: ModelInterface|undefined;

	private _verticalTabHeaderEl: HTMLDivElement;
	private _incompleteListEl: HTMLDivElement;

	onResize() {
		super.onResize();
		this.initialise([]);
		this.render();
	}

	initialise(
		params: any[],
	): void {
		super.initialise([]);
		const campaigns = this.api.database.read<CampaignInterface>((campaign: CampaignInterface) => campaign.id.type === ComponentType.Campaign);

		this._hasCampaigns = campaigns.length > 0;
		if (campaigns.length === 1)
			this._currentCampaign = campaigns[0];
		else
			this._currentCampaign = undefined;

		const file:TFile|null = this.app.workspace.getActiveFile();
		if (file != null)
			this._currentComponent = this.api.database.readByPath(file.path);
		else
			this._currentComponent = undefined;

	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.removeClass('rpgm-view');
		this.rpgmContentEl.addClass('rpg-manager-right-view');
		this.rpgmContentEl.empty();
		this.rpgmContentEl.createEl('h2', {text: 'RPG Manager'});

		this._addCreators();

		this._incompleteListEl = this.rpgmContentEl.createDiv();
		this._addIncompleteComponents();

		this._addReleaseNotes();

		return Promise.resolve(undefined);
	}

	private _addTitle(
		containerEl: HTMLElement,
		title: string,
		defaultOpen?: boolean,
	): HTMLDivElement {
		const titleElcontainerEl = containerEl.createDiv({cls: 'rpg-manager-right-view-title clearfix'});
		const response: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-right-view-container'});

		if (defaultOpen) {
			setIcon(titleElcontainerEl, 'chevron-down');
			titleElcontainerEl.addClass('open');
			response.addClass('open');
		} else {
			setIcon(titleElcontainerEl, 'chevron-right');
			titleElcontainerEl.addClass('closed');
			response.addClass('closed');
		}

		titleElcontainerEl.createEl('h3', {text: title});

		titleElcontainerEl.addEventListener('click', () => {
			titleElcontainerEl.empty();
			if (titleElcontainerEl.hasClass('open')) {
				titleElcontainerEl.removeClass('open');
				response.removeClass('open');
				titleElcontainerEl.addClass('closed');
				response.addClass('closed');


				setIcon(titleElcontainerEl, 'chevron-right');
			} else {
				titleElcontainerEl.removeClass('closed');
				response.removeClass('closed');
				titleElcontainerEl.addClass('open');
				response.addClass('open');

				setIcon(titleElcontainerEl, 'chevron-down');
			}

			titleElcontainerEl.createEl('h3', {text: title});
		});

		return response;
	}

	private _addCreators(
	): void {
		const containerEl: HTMLDivElement = this._addTitle(this.rpgmContentEl, 'Create new...', true);

		this._createElementListItem(ComponentType.Campaign, containerEl);
		if (this._hasCampaigns) {
			Object.keys(ComponentType).filter((v) => isNaN(Number(v))).forEach((typeString:string) => {
				const type: ComponentType = ComponentType[typeString as keyof typeof ComponentType];
				if (type !== ComponentType.Campaign){
					this._createElementListItem(type, containerEl);
				}
			});
		}
	}

	private _createElementListItem(
		type: ComponentType,
		containerEl: HTMLDivElement,
	): void {
		const itemEl = containerEl.createDiv({cls: 'rpg-manager-right-view-container-element', text: ComponentType[type]});
		itemEl.addEventListener("click", () => {
			this._openCreationModal(type);
		});
	}

	private async _addIncompleteComponents(
	): Promise<void> {
		this._incompleteListEl.empty();

		const containerEl: HTMLDivElement = this._addTitle(this._incompleteListEl, 'Incomplete elements', false);

		const components: ModelInterface[] = this.api.database.read<ModelInterface>((component: ModelInterface) => component.isComplete === false);
		components.forEach((component: ModelInterface) => {
			const itemEl = containerEl.createDiv({cls: 'rpg-manager-right-view-container-element', text: component.file.basename});
			itemEl.addEventListener('click', () => {
				this.app.workspace.getLeaf(false).openFile(component.file);
			});
		});

		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this._addIncompleteComponents.bind(this)));
	}

	private async _addReleaseNotes(
	): Promise<void> {
		const containerEl: HTMLDivElement = this._addTitle(this.rpgmContentEl, 'Help', false);
		containerEl.createDiv({cls: 'rpg-manager-right-view-container-element', text: 'Release notes'})
			.addEventListener('click', () => {
				this.api.staticViews.create(StaticViewType.ReleaseNote);
			});
	}

	private _openCreationModal(
		type: ComponentType,
	): void {
		let modalOpened = false;

		if (this._currentComponent !== undefined) {
			modalOpened = true;
			new CreationModal(this.api, type, true, null, this._currentComponent?.id.campaignId, this._currentComponent?.id.adventureId, this._currentComponent?.id.actId).open();
		} else if (this._currentCampaign !== undefined) {
			modalOpened = true;
			new CreationModal(this.api, type, true, null, this._currentCampaign?.id.campaignId).open();
		}

		if (!modalOpened){
			new CreationModal(this.api, type).open();
		}
	}
}
