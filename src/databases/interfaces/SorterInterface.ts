import {SorterComparisonElementInterface} from "./SorterComparisonElementInterface";

export interface SorterInterface {
	comparisonElements: SorterComparisonElementInterface[];

	getSortingFunction(
		leftData: any,
		rightData:any,
	): number;
}
