import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {ClueInterface} from "../interfaces/data/ClueInterface";

export class Clue extends AbstractElementRecord implements ClueInterface {
	public found: Date|null;

	protected initialiseData(
	): void {
		this.found = this.initialiseDate(this.frontmatter?.dates?.found);

		super.initialiseData();
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}
