import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {DataType} from "../enums/DataType";

export class Adventure extends AbstractOutlineRecord implements AdventureInterface {
	public adventureId: number;

	protected initialiseData(
	): void {
		this.adventureId = this.id.getTypeValue(DataType.Adventure);

		super.initialiseData();
	}
}
