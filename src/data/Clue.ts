import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {ClueInterface} from "../interfaces/data/ClueInterface";

export class Clue extends AbstractRpgElementData implements ClueInterface {
	public found: Date|null;

	protected async loadData(
	): Promise<void> {
		this.found = this.initialiseDate(this.frontmatter?.dates?.found);

		super.loadData();
	}

	public get isFound(
	): boolean {
		return this.found != null;
	}
}
