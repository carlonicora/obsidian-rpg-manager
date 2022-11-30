import {SorterType} from "../../searchService/enums/SorterType";

export interface SorterComparisonElementInterface {
	comparisonElement: any;
	sortType: SorterType;
	sortFunction(a: any, b: any): number;
}
