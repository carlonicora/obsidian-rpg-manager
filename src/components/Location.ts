import {AbstractComponentElement} from "../abstracts/AbstractComponentElement";
import {LocationInterface} from "../interfaces/components/LocationInterface";
import {FrontMatterCache} from "obsidian";

export class Location extends AbstractComponentElement implements LocationInterface {
	public address: string|null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.address = frontmatter?.address;

		super.initialiseData(frontmatter);
	}
}
