import {AbstractElementData} from "../abstracts/database/AbstractElementData";
import {ClueInterface} from "../interfaces/data/ClueInterface";

export class Clue extends AbstractElementData implements ClueInterface {
	public found: Date|null;

	protected loadData(
	): void {
		this.found = this.initialiseDate(this.frontmatter?.dates?.found);

		super.loadData();
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}
