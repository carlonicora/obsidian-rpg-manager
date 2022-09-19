import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {EventInterface} from "../interfaces/data/EventInterface";

export class Event extends AbstractElementRecord implements EventInterface {
	public date: Date|null;

	protected initialiseData(
	): void {
		this.date = this.initialiseDate(this.frontmatter?.dates?.event);

		super.initialiseData();
	}
}
