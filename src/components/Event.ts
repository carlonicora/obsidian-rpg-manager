import {AbstractComponentElement} from "../abstracts/AbstractComponentElement";
import {EventInterface} from "../interfaces/components/EventInterface";
import {FrontMatterCache} from "obsidian";

export class Event extends AbstractComponentElement implements EventInterface {
	public date: Date|null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.date = this.initialiseDate(frontmatter?.dates?.event);

		super.initialiseData(frontmatter);
	}
}
