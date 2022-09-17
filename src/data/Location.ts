import {AbstractElementRecord} from "../abstracts/database/AbstractElementRecord";
import {LocationInterface} from "../interfaces/data/LocationInterface";

export class Location extends AbstractElementRecord implements LocationInterface {
	public address: string|null;

	protected initialiseData(
	): void {
		this.address = this.frontmatter?.address;

		super.initialiseData();
	}
}
