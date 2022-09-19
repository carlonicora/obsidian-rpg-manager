import {Character} from "../../../data/Character";
import {FrontMatterCache} from "obsidian";

export class VampireCharacter extends Character {
	public generation: number|null;

	protected async initialiseData(
		frontmatter: FrontMatterCache|undefined,
	) {
		this.generation = frontmatter?.generation;

		super.initialiseData(frontmatter);
	}
}
