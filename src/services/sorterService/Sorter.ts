import {SorterComparisonElementInterface} from "./interfaces/SorterComparisonElementInterface";
import {SorterType} from "../searchService/enums/SorterType";
import {SorterInterface} from "./interfaces/SorterInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";

export class Sorter implements SorterInterface {
	public comparisonElements: SorterComparisonElementInterface[];

	constructor(
		comparisonElements: SorterComparisonElementInterface[]|undefined,
	) {
		if (comparisonElements !== undefined){
			this.comparisonElements = comparisonElements;
		} else {
			this.comparisonElements = [];
		}
	}

	public getSortingFunction(
		leftData: ModelInterface,
		rightData: ModelInterface,
	): number {
		for (let index=0; index<this.comparisonElements.length; index++){
			const comparer = this.comparisonElements[index];

			if (typeof comparer.comparisonElement === 'function'){
				const comparisonResult: number = comparer.sortFunction(leftData, rightData);

				if (comparisonResult !== 0)
					return comparisonResult;

				// if (comparer.comparisonElement(leftData) > comparer.comparisonElement(rightData)) return comparer.sortType === SorterType.Ascending ? +1 : -1;
				// if (comparer.comparisonElement(leftData) < comparer.comparisonElement(rightData)) return comparer.sortType === SorterType.Ascending ? -1 : +1;
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
