import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {RecordType} from "../enums/RecordType";
import {ViewType} from "../enums/ViewType";
import {CreationModal} from "../modals/CreationModal";
import {TFile} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export class CreatorView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Creator.toString();
	protected displayText = 'RPG Manager Creator';
	public icon = 'd20';
	private hasCampaigns: boolean;

	private currentCampaign: CampaignInterface|undefined;
	private currentElement: RecordInterface|undefined;

	private creationListEl: HTMLUListElement;

	onResize() {
		super.onResize();
		this.initialise([]);
		this.render();
	}

	initialise(
		params: Array<any>,
	): void {
		super.initialise([])
		const campaigns = this.database.read<CampaignInterface>((campaign: CampaignInterface) => campaign.id.type === RecordType.Campaign);
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

	render(
	): Promise<void> {
		this.creationListEl = this.rpgmContentEl.createEl('ul');

		this.createElementListItem(RecordType.Campaign);

		if (this.hasCampaigns) {
			Object.keys(RecordType).filter((v) => isNaN(Number(v))).forEach((typeString:string) => {
				const type: RecordType = RecordType[typeString as keyof typeof RecordType];
				if (type !== RecordType.Campaign){
					this.createElementListItem(type);
				}
			});
		}

		return Promise.resolve(undefined);
	}

	private createElementListItem(
		type: RecordType,
	): void {
		const listElementEl = this.creationListEl.createEl('li');
		listElementEl.createEl('a', {href: '#', text: 'Create new ' + RecordType[type]})
			.addEventListener("click", () => {
				this.openCreationModal(type);
			});
	}

	private openCreationModal(
		type: RecordType,
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
			console.log('I don\'t have anything!')
			new CreationModal(this.app, type).open();
		}
	}
}
