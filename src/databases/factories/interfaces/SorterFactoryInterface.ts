import {SorterComparisonElementInterface} from "../../interfaces/SorterComparisonElementInterface";

export interface SorterFactoryInterface {
	create<T>(
		comparisonElements: Array<SorterComparisonElementInterface>,
	): (a: T, b: T) => number;
}
