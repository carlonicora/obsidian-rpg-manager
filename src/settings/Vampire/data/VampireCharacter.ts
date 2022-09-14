import {Character} from "../../../data/Character";

export class VampireCharacter extends Character {
	public generation: number|null;

	protected async loadData(
	) {
		this.generation = this.frontmatter?.generation;

		super.loadData();
	}
}
