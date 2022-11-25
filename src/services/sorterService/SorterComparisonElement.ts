import {SorterComparisonElementInterface} from "./interfaces/SorterComparisonElementInterface";
import {SorterType} from "../searchService/enums/SorterType";

export class SorterComparisonElement implements SorterComparisonElementInterface {
	constructor(
		public comparisonElement: any,
		public sortType: SorterType=SorterType.Ascending,
	) {
	}

	public sortFunction(
		leftData: any,
		rightData: any
	): number {
		if (this.comparisonElement(leftData) > this.comparisonElement(rightData))
			return this.sortType === SorterType.Ascending ? +1 : -1;

		if (this.comparisonElement(leftData) < this.comparisonElement(rightData))
			return this.sortType === SorterType.Ascending ? -1 : +1;

		return 0;
	}
}
