import {SorterComparisonElementInterface} from "./SorterComparisonElementInterface";

export interface SorterServiceInterface {
	create<T>(
		comparisonElements: SorterComparisonElementInterface[],
	): (a: T, b: T) => number;
}
