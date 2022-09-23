import {SorterComparisonElementInterface} from "../SorterComparisonElementInterface";

export interface SorterInterface {
	comparisonElements: Array<SorterComparisonElementInterface>;

	getSortingFunction(
		leftData: any,
		rightData:any,
	): number;
}
