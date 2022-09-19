import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {FrontMatterCache} from "obsidian";

export class Clue extends AbstractElementRecord implements ClueInterface {
	public found: Date|null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.found = this.initialiseDate(frontmatter?.dates?.found);

		super.initialiseData(frontmatter);
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}
