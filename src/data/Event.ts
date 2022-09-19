import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {EventInterface} from "../interfaces/data/EventInterface";
import {FrontMatterCache} from "obsidian";

export class Event extends AbstractElementRecord implements EventInterface {
	public date: Date|null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.date = this.initialiseDate(frontmatter?.dates?.event);

		super.initialiseData(frontmatter);
	}
}
