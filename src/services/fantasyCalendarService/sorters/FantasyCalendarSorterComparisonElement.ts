import {SorterComparisonElementInterface} from "../../sorterService/interfaces/SorterComparisonElementInterface";
import {SorterType} from "../../searchService/enums/SorterType";
import {FantasyCalendarDateInterface} from "../interfaces/FantasyCalendarDateInterface";

export class FantasyCalendarSorterComparisonElement implements SorterComparisonElementInterface {
	constructor(
		public comparisonElement: any,
		public sortType: SorterType=SorterType.Ascending,
	) {
	}

	public sortFunction(
		leftData: any,
		rightData: any
	): number {
		const left: FantasyCalendarDateInterface|undefined = this.comparisonElement(leftData);
		const right: FantasyCalendarDateInterface|undefined = this.comparisonElement(rightData);

		if (left === undefined && right === undefined)
			return 0;

		if (left === undefined && right !== undefined)
			return this.sortType === SorterType.Ascending ? -1 : +1;

		if (left !== undefined && right === undefined)
			return this.sortType === SorterType.Ascending ? +1 : -1;

		if (left !== undefined && right !== undefined){
			if (left.year > right.year)
				return this.sortType === SorterType.Ascending ? +1 : -1;

			if (left.year < right.year)
				return this.sortType === SorterType.Ascending ? -1 : +1;

			if (left.month > right.month)
				return this.sortType === SorterType.Ascending ? +1 : -1;

			if (left.month < right.month)
				return this.sortType === SorterType.Ascending ? -1 : +1;

			if (left.day > right.day)
				return this.sortType === SorterType.Ascending ? +1 : -1;

			if (left.day < right.day)
				return this.sortType === SorterType.Ascending ? -1 : +1;

		}

		return 0;
	}
}
