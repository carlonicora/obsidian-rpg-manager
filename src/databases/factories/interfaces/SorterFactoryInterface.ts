import {SorterComparisonElementInterface} from "../../interfaces/SorterComparisonElementInterface";

export interface SorterFactoryInterface {
	create<T>(
		comparisonElements: SorterComparisonElementInterface[],
	): (a: T, b: T) => number;
}
