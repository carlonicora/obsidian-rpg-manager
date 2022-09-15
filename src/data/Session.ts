import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";

export class Session extends AbstractRpgOutlineData implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;
	public note: NoteInterface|null=null;

	protected loadData(
	): void {
		this.sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		this.date = this.initialiseDate(this.frontmatter?.dates?.session);
		this.irl = this.initialiseDate(this.frontmatter?.dates?.irl);

		super.loadData();
	}

	public async loadHierarchy(
		dataList: RpgDataListInterface,
	): Promise<void> {
		super.loadHierarchy(dataList);

		this.adventure = this.loadAdventure(dataList, this.campaign.campaignId);
		this.previousSession = this.app.plugins.getPlugin('rpg-manager').io.getSession(this.campaign.campaignId, null, this.sessionId - 1);
		this.nextSession = this.app.plugins.getPlugin('rpg-manager').io.getSession(this.campaign.campaignId, null, this.sessionId + 1);
		this.note = this.app.plugins.getPlugin('rpg-manager').io.getNote(this.campaign.campaignId, this.adventure.adventureId, this.sessionId);

		if (this.nextSession != null) this.nextSession.previousSession = this;
		if (this.nextSession != null) this.nextSession.previousSession = this;
	}
}
