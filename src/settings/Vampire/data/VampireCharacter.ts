import {Character} from "../../Agnostic/data/Character";
import {CachedMetadata, TFile} from "obsidian";

export class VampireCharacter extends Character {
	public generation: number|null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.generation = this.frontmatter?.generation;
	}
}
