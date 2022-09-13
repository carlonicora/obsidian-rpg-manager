import {AbstractRpgOutlineData} from "../abstracts/AbstractRpgOutlineData";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {CachedMetadata, TFile} from "obsidian";

export class Adventure extends AbstractRpgOutlineData implements AdventureInterface {
	public adventureId: number;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.adventureId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		this.checkElementDuplication();
	}

	public initialiseNeighbours(
	): void {
	}
}
