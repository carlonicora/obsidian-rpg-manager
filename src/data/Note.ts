import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";

export class Note extends AbstractRpgOutlineData implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public loadHierarchy(
		dataList: RpgDataListInterface,
	) {
		super.loadHierarchy(dataList);

		this.adventure = this.loadAdventure(this.campaign.campaignId);
		const session = this.loadSession(this.campaign.campaignId, this.adventure.adventureId);
		this.sessionId = session.sessionId;
	}
}
