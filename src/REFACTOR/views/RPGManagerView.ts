import {AbstractRpgManagerView} from "../../core/abstracts/AbstractRpgManagerView";
import {ComponentType} from "../../core/enums/ComponentType";
import {ViewType} from "./enums/ViewType";
import {CreationModal} from "../../core/modals/CreationModal";
import {setIcon, TFile} from "obsidian";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {CampaignInterface} from "../../components/campaign/interfaces/CampaignInterface";

export class RPGManagerView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.RPGManager.toString();
	protected displayText = 'RPG Manager';
	public icon = 'd20';
	private _hasCampaigns: boolean;

	private _currentCampaign: CampaignInterface|undefined;
	private _currentComponent: ComponentModelInterface|undefined;

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
		super.initialise([])
		const campaigns = this.database.read<CampaignInterface>((campaign: CampaignInterface) => campaign.id.type === ComponentType.Campaign);
		this._hasCampaigns = campaigns.length > 0;
		if (campaigns.length === 1) {
			this._currentCampaign = campaigns[0];
		} else {
			this._currentCampaign = undefined;
		}

		const file:TFile|null = this.app.workspace.getActiveFile();
		if (file != null){
			this._currentComponent = this.database.readByPath(file.path);
		} else {
			this._currentComponent = undefined;
		}
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.removeClass('rpgm-view');
		this.rpgmContentEl.addClass('rpgm-right-view');
		this.rpgmContentEl.empty();

		this._verticalTabHeaderEl = this.rpgmContentEl.createDiv({cls: 'vertical-tab-header'});
		this._verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title  title', text: 'RPG Manager'});

		this._addCreationLinks();
		this._addIncompleteComponents();
		this._addToDoList();
		this._addReleaseNotes();

		return Promise.resolve(undefined);
	}

	private async _addIncompleteComponents(
	): Promise<void> {
		const groupEl = this._verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title'});

		const arrowEl: HTMLSpanElement = groupEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');
		const titleEl = groupEl.createSpan({text: 'Incomplete Components'});

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		this._incompleteListEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		this._incompleteListEl.style.display = 'none';

		arrowEl.addEventListener('click', () => {
			if (this._incompleteListEl.style.display === 'none'){
				this._incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		titleEl.addEventListener('click', () => {
			if (this._incompleteListEl.style.display === 'none'){
				this._incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		this._addIncompleteComponentList();
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this._addIncompleteComponentList.bind(this)));
	}

	private async _addIncompleteComponentList(
	): Promise<void> {
		this._incompleteListEl.empty();
		const components: ComponentModelInterface[] = this.database.read<ComponentModelInterface>((component: ComponentModelInterface) => component.isComplete === false);
		components.forEach((component: ComponentModelInterface) => {
			const itemEl = this._incompleteListEl.createDiv({cls: 'vertical-tab-nav-item', text: component.file.basename});

			itemEl.addEventListener('click', () => {
				this.app.workspace.getLeaf(false).openFile(component.file);
			});
		});
	}

	private async _addReleaseNotes(
	): Promise<void> {
		const groupEl = this._verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title', text: 'Release Notes'});
		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		const itemEl = groupItemEl.createDiv({cls: 'vertical-tab-nav-item', text: 'Read Release Notes'});
		itemEl.addEventListener('click', () => {
			this.factories.views.showObsidianView(ViewType.ReleaseNote);
		});
	}

	private _addToDoList(
	): void {
		const groupEl = this._verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title'});

		const arrowEl: HTMLSpanElement = groupEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');
		const titleEl = groupEl.createSpan({text: 'To Do List'});

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		arrowEl.addEventListener('click', () => {
			if (this._incompleteListEl.style.display === 'none'){
				this._incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		titleEl.addEventListener('click', () => {
			if (this._incompleteListEl.style.display === 'none'){
				this._incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		groupItemEl.style.display = 'none';
		this._loadToDo(groupItemEl);
	}

	private _addCreationLinks(
	): void {
		const groupEl = this._verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title', text: 'Create New Components'});
		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});

		this._createElementListItem(ComponentType.Campaign, groupItemEl);
		if (this._hasCampaigns) {
			Object.keys(ComponentType).filter((v) => isNaN(Number(v))).forEach((typeString:string) => {
				const type: ComponentType = ComponentType[typeString as keyof typeof ComponentType];
				if (type !== ComponentType.Campaign){
					this._createElementListItem(type, groupItemEl);
				}
			});
		}
	}

	private async _loadToDo(
		containerEl: HTMLDivElement
	): Promise<void> {
		const components: ComponentModelInterface[] = this.database.read<ComponentModelInterface>((component: ComponentModelInterface) => true);

		let firstToDoFound = false;

		components.forEach((component: ComponentModelInterface) => {
			this.app.vault.read(component.file)
				.then((content: string) => {
					const contentArray: string[] = content.split('\n');
					contentArray.forEach((line: string) => {
						if (line.trimStart().startsWith('- [ ]')) {
							if (!firstToDoFound){
								firstToDoFound = true;
								containerEl.empty();
							}

							line = line
								.replaceAll('- [ ]', '')
								.replaceAll('*', '');

							let finalLine = line;

							while (line.indexOf('[[') !== -1){
								line = line.substring(line.indexOf('[[') + 2);
								const endLinkIndex = line.indexOf(']]');
								if (endLinkIndex === -1) break;

								const nameAndAlias = line.substring(0, endLinkIndex);
								const aliasIndex = nameAndAlias.indexOf('|');
								if (aliasIndex === -1){
									finalLine = finalLine.replaceAll('[[' + nameAndAlias + ']]', nameAndAlias);
								} else {
									finalLine = finalLine.replaceAll('[[' +  nameAndAlias+ ']]', nameAndAlias.substring(0, aliasIndex));
								}
							}

							const itemEl = containerEl.createDiv({cls: 'vertical-tab-nav-item', text:finalLine});

							itemEl.addEventListener('click', () => {
								this.app.workspace.getLeaf(false).openFile(component.file);
							});
						}
					});
				})
		});

	}

	private _createElementListItem(
		type: ComponentType,
		containerEl: HTMLDivElement,
	): void {
		const itemEl = containerEl.createDiv({cls: 'vertical-tab-nav-item', text: 'Create new ' + ComponentType[type]});
		itemEl.addEventListener("click", () => {
			this._openCreationModal(type);
		});
	}

	private _openCreationModal(
		type: ComponentType,
	): void {
		let modalOpened = false;

		if (this._currentComponent !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this._currentComponent?.id.campaignId, this._currentComponent?.id.adventureId, this._currentComponent?.id.actId).open();
		} else if (this._currentCampaign !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this._currentCampaign?.id.campaignId).open();
		}

		if (!modalOpened){
			new CreationModal(this.app, type).open();
		}
	}
}
