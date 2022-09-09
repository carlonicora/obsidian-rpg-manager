import {NoteInterface} from "../../../interfaces/data/NoteInterface";
import {AdventureInterface} from "../../../interfaces/data/AdventureInterface";
import {SessionInterface} from "../../../interfaces/data/SessionInterface";
import {CachedMetadata, TFile} from "obsidian";
import {DataType} from "../../../enums/DataType";
import {AbstractRpgOutlineData} from "../../../abstracts/AbstractRpgOutlineData";

export class Note extends AbstractRpgOutlineData implements NoteInterface {
	public adventure: AdventureInterface;
	public session: SessionInterface;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		const adventure = this.app.plugins.getPlugin('rpg-manager').io.getAdventure(this.campaign.campaignId, this.app.plugins.getPlugin('rpg-manager').functions.getTagId(this.frontmatter?.tags, DataType.Adventure));
		if (adventure != null) {
			this.adventure = adventure;
			const session = this.app.plugins.getPlugin('rpg-manager').io.getSession(this.campaign.campaignId, this.adventure.adventureId, this.app.plugins.getPlugin('rpg-manager').functions.getTagId(this.frontmatter?.tags, DataType.Session));
			if (session != null) this.session = session;
		}
	}

	public initialiseNeighbours(
	): void {
		this.session.note = this;
	}
}
