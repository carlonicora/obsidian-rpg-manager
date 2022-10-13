import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ComponentType} from "../components/enums/ComponentType";
import {ViewType} from "./enums/ViewType";
import {CreationModal} from "../modals/CreationModal";
import {setIcon, TFile} from "obsidian";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {CampaignInterface} from "../components/components/campaign/interfaces/CampaignInterface";

export class RPGManagerView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.RPGManager.toString();
	protected displayText = 'RPG Manager';
	public icon = 'd20';
	private hasCampaigns: boolean;

	private currentCampaign: CampaignInterface|undefined;
	private currentComponent: ComponentInterface|undefined;

	private verticalTabHeaderEl: HTMLDivElement;
	private incompleteListEl: HTMLDivElement;

	onResize() {
		super.onResize();
		this.initialise([]);
		this.render();
	}

	initialise(
		params: Array<any>,
	): void {
		super.initialise([])
		const campaigns = this.database.read<CampaignInterface>((campaign: CampaignInterface) => campaign.id.type === ComponentType.Campaign);
		this.hasCampaigns = campaigns.length > 0;
		if (campaigns.length === 1) {
			this.currentCampaign = campaigns[0];
		} else {
			this.currentCampaign = undefined;
		}

		const file:TFile|null = this.app.workspace.getActiveFile();
		if (file != null){
			this.currentComponent = this.database.readByPath(file.path);
		} else {
			this.currentComponent = undefined;
		}
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.removeClass('rpgm-view');
		this.rpgmContentEl.addClass('rpgm-right-view');
		this.rpgmContentEl.empty();

		this.verticalTabHeaderEl = this.rpgmContentEl.createDiv({cls: 'vertical-tab-header'});
		this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title  title', text: 'RPG Manager'});

		this.addCreationLinks();
		this.addIncompleteComponents();
		this.addToDoList();
		this.addReleaseNotes();

		return Promise.resolve(undefined);
	}

	private async addIncompleteComponents(
	): Promise<void> {
		const groupEl = this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title'});

		const arrowEl: HTMLSpanElement = groupEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');
		const titleEl = groupEl.createSpan({text: 'Incomplete Components'});

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		this.incompleteListEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		this.incompleteListEl.style.display = 'none';

		arrowEl.addEventListener('click', () => {
			if (this.incompleteListEl.style.display === 'none'){
				this.incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this.incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		titleEl.addEventListener('click', () => {
			if (this.incompleteListEl.style.display === 'none'){
				this.incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this.incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		this.addIncompleteComponentList();
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.addIncompleteComponentList.bind(this)));
	}

	private async addIncompleteComponentList(
	): Promise<void> {
		this.incompleteListEl.empty();
		const components: Array<ComponentInterface> = this.database.read<ComponentInterface>((component: ComponentInterface) => component.isComplete === false);
		components.forEach((component: ComponentInterface) => {
			const itemEl = this.incompleteListEl.createDiv({cls: 'vertical-tab-nav-item', text: component.file.basename});

			itemEl.addEventListener('click', () => {
				this.app.workspace.getLeaf(false).openFile(component.file);
			});
		});
	}

	private async addReleaseNotes(
	): Promise<void> {
		const groupEl = this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title', text: 'Release Notes'});
		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		const itemEl = groupItemEl.createDiv({cls: 'vertical-tab-nav-item', text: 'Read Release Notes'});
		itemEl.addEventListener('click', () => {
			this.factories.views.showObsidianView(ViewType.ReleaseNote);
		});
	}

	private addToDoList(
	): void {
		const groupEl = this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title'});

		const arrowEl: HTMLSpanElement = groupEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');
		const titleEl = groupEl.createSpan({text: 'To Do List'});

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		arrowEl.addEventListener('click', () => {
			if (this.incompleteListEl.style.display === 'none'){
				this.incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this.incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		titleEl.addEventListener('click', () => {
			if (this.incompleteListEl.style.display === 'none'){
				this.incompleteListEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this.incompleteListEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});

		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
		groupItemEl.style.display = 'none';
		this.loadToDo(groupItemEl);
	}

	private addCreationLinks(
	): void {
		const groupEl = this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title', text: 'Create New Components'});
		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});

		this.createElementListItem(ComponentType.Campaign, groupItemEl);
		if (this.hasCampaigns) {
			Object.keys(ComponentType).filter((v) => isNaN(Number(v))).forEach((typeString:string) => {
				const type: ComponentType = ComponentType[typeString as keyof typeof ComponentType];
				if (type !== ComponentType.Campaign){
					this.createElementListItem(type, groupItemEl);
				}
			});
		}
	}

	private async loadToDo(
		containerEl: HTMLDivElement
	): Promise<void> {
		const components: Array<ComponentInterface> = this.database.read<ComponentInterface>((component: ComponentInterface) => true);

		let firstToDoFound = false;

		components.forEach((component: ComponentInterface) => {
			this.app.vault.read(component.file)
				.then((content: string) => {
					const contentArray: Array<string> = content.split('\n');
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

	private createElementListItem(
		type: ComponentType,
		containerEl: HTMLDivElement,
	): void {
		const itemEl = containerEl.createDiv({cls: 'vertical-tab-nav-item', text: 'Create new ' + ComponentType[type]});
		itemEl.addEventListener("click", () => {
			this.openCreationModal(type);
		});
	}

	private openCreationModal(
		type: ComponentType,
	): void {
		let modalOpened = false;

		if (this.currentComponent !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this.currentComponent?.id.campaignId, this.currentComponent?.id.adventureId, this.currentComponent?.id.actId).open();
		} else if (this.currentCampaign !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this.currentCampaign?.id.campaignId).open();
		}

		if (!modalOpened){
			new CreationModal(this.app, type).open();
		}
	}
}
