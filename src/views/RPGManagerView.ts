import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {CampaignInterface} from "../interfaces/components/CampaignInterface";
import {ComponentType} from "../enums/ComponentType";
import {ViewType} from "../enums/ViewType";
import {CreationModal} from "../modals/CreationModal";
import {TFile} from "obsidian";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";

export class RPGManagerView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.RPGManager.toString();
	protected displayText = 'RPG Manager';
	public icon = 'd20';
	private hasCampaigns: boolean;

	private currentCampaign: CampaignInterface|undefined;
	private currentElement: ComponentInterface|undefined;

	private verticalTabHeaderEl: HTMLDivElement;

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
			this.currentElement = this.database.readByPath(file.path);
		} else {
			this.currentElement = undefined;
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
		this.addReleaseNotes();
		this.addToDoList();

		return Promise.resolve(undefined);
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
		const groupEl = this.verticalTabHeaderEl.createDiv({cls: 'vertical-tab-headers-group-title', text: 'To Do List'});
		const groupItemEl = groupEl.createDiv({cls: 'vertical-tab-headers-group-items'});
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
		const recordset: Array<ComponentInterface> = this.database.read<ComponentInterface>((data: ComponentInterface) => true);

		let firstToDoFound = false;

		recordset.forEach((data: ComponentInterface) => {
			this.app.vault.read(data.file)
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
								this.app.workspace.getLeaf(false).openFile(data.file);
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

		if (this.currentElement !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this.currentElement?.id.campaignId, this.currentElement?.id.adventureId, this.currentElement?.id.actId).open();
		} else if (this.currentCampaign !== undefined) {
			modalOpened = true;
			new CreationModal(this.app, type, true, null, this.currentCampaign?.id.campaignId).open();
		}

		if (!modalOpened){
			new CreationModal(this.app, type).open();
		}
	}
}
