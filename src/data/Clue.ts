import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {CachedMetadata, TFile} from "obsidian";

export class Clue extends AbstractRpgElementData implements ClueInterface {
	public found: Date|null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.found = this.initialiseDate(this.frontmatter?.dates?.found);
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}
