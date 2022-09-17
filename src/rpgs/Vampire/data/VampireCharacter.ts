import {Character} from "../../../data/Character";

export class VampireCharacter extends Character {
	public generation: number|null;

	protected async initialiseData(
	) {
		this.generation = this.frontmatter?.generation;

		super.initialiseData();
	}
}
