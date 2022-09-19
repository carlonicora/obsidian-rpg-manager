import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {LocationInterface} from "../interfaces/data/LocationInterface";
import {FrontMatterCache} from "obsidian";

export class Location extends AbstractElementRecord implements LocationInterface {
	public address: string|null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.address = frontmatter?.address;

		super.initialiseData(frontmatter);
	}
}
