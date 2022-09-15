import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";

export class Note extends AbstractRpgOutlineData implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public async loadHierarchy(
		dataList: RpgDataListInterface,
	): Promise<void> {
		super.loadHierarchy(dataList);

		this.adventure = this.loadAdventure(dataList, this.campaign.campaignId);
		const session = this.loadSession(dataList, this.campaign.campaignId, this.adventure.adventureId);
		this.sessionId = session.sessionId;
	}
}
