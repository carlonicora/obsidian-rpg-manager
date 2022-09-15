import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {EventInterface} from "../interfaces/data/EventInterface";

export class Event extends AbstractRpgElementData implements EventInterface {
	public date: Date|null;

	protected loadData(
	): void {
		this.date = this.initialiseDate(this.frontmatter?.dates?.event);

		super.loadData();
	}
}
