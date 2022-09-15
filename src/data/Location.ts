import {AbstractElementData} from "../abstracts/database/AbstractElementData";
import {LocationInterface} from "../interfaces/data/LocationInterface";

export class Location extends AbstractElementData implements LocationInterface {
	public address: string|null;

	protected loadData(
	): void {
		this.address = this.frontmatter?.address;

		super.loadData();
	}
}
