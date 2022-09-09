import {AbstractRpgOutlineData} from "../../../abstracts/AbstractRpgOutlineData";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {CachedMetadata, TFile} from "obsidian";
import {DataType} from "../../../enums/DataType";
import {NoteInterface} from "../../../interfaces/data/NoteInterface";

export class Session extends AbstractRpgOutlineData implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;
	public notes: NoteInterface|null=null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.sessionId = this.app.plugins.getPlugin('rpg-manager').functions.getTagId(metadata.frontmatter?.tags, this.type);
		const adventure = this.app.plugins.getPlugin('rpg-manager').io.getAdventure(this.campaign.campaignId, this.app.plugins.getPlugin('rpg-manager').functions.getTagId(this.frontmatter?.tags, DataType.Adventure));
		if (adventure != null) this.adventure = adventure;
		this.date = this.initialiseDate(this.frontmatter?.dates?.session);
		this.irl = this.initialiseDate(this.frontmatter?.dates?.irl);
	}

	public initialiseNeighbours(
	): void {
		if (this.campaign != null && this.adventure != null) {
			this.previousSession = this.app.plugins.getPlugin('rpg-manager').io.getSession(this.campaign.campaignId, null, this.sessionId - 1);
			this.nextSession = this.app.plugins.getPlugin('rpg-manager').io.getSession(this.campaign.campaignId, null, this.sessionId + 1);
			this.notes = this.app.plugins.getPlugin('rpg-manager').io.getNote(this.campaign.campaignId, this.adventure.adventureId, this.sessionId);

			if (this.nextSession != null) this.nextSession.previousSession = this;
			if (this.nextSession != null) this.nextSession.previousSession = this;
		}
	}
}
