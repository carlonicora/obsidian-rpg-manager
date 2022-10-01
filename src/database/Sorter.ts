import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";
import {SorterType} from "../enums/SorterType";
import {SorterInterface} from "../interfaces/database/SorterInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export class Sorter implements SorterInterface {
	public comparisonElements: Array<SorterComparisonElementInterface>;

	constructor(
		comparisonElements: Array<SorterComparisonElementInterface>|undefined,
	) {
		if (comparisonElements !== undefined){
			this.comparisonElements = comparisonElements;
		} else {
			this.comparisonElements = [];
		}
	}

	public addComparisonElement(
		comparisonElement: any,
		sortType: SorterType = SorterType.Ascending,
	): Sorter {
		this.comparisonElements.push({comparisonElement: comparisonElement, sortType: sortType});

		return this;
	}

	public getSortingFunction(
		leftData: ComponentV2Interface,
		rightData: ComponentV2Interface,
	): number {
		for (let index=0; index<this.comparisonElements.length; index++){
			const comparer = this.comparisonElements[index];

			if (typeof comparer.comparisonElement === 'function'){
				if (comparer.comparisonElement(leftData) > comparer.comparisonElement(rightData)) return comparer.sortType === SorterType.Ascending ? +1 : -1;
				if (comparer.comparisonElement(leftData) < comparer.comparisonElement(rightData)) return comparer.sortType === SorterType.Ascending ? -1 : +1;
			} else {
				if (this.getObjectValue(leftData, comparer.comparisonElement) > this.getObjectValue(rightData, comparer.comparisonElement)) return comparer.sortType === SorterType.Ascending ? +1 : -1;
				if (this.getObjectValue(leftData, comparer.comparisonElement) < this.getObjectValue(rightData, comparer.comparisonElement)) return comparer.sortType === SorterType.Ascending ? -1 : +1;
			}
		}

		return 0;
	}

	public getObjectValue(
		object: any,
		value: any,
	): any {
		let response: any = object;

		const litteralValue = value.toString();
		const valueElements = litteralValue.split('.');
		valueElements.shift();

		while (valueElements.length > 0){
			const id: string = valueElements.shift();
			const idKey = id as keyof typeof response;
			response = response[idKey];
		}

		return response;
	}
}
