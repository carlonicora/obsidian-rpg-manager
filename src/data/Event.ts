import {AbstractElementData} from "../abstracts/database/AbstractElementData";
import {EventInterface} from "../interfaces/data/EventInterface";

export class Event extends AbstractElementData implements EventInterface {
	public date: Date|null;

	protected loadData(
	): void {
		this.date = this.initialiseDate(this.frontmatter?.dates?.event);

		super.loadData();
	}
}
