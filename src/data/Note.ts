import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {CachedMetadata, TFile} from "obsidian";
import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";

export class Note extends AbstractRpgOutlineData implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.adventure = this.loadAdventure(this.campaign.campaignId);
		const session = this.loadSession(this.campaign.campaignId, this.adventure.adventureId);
		this.checkElementDuplication();

		this.sessionId = session.sessionId;
	}

	public initialiseNeighbours(
	): void {
	}
}
