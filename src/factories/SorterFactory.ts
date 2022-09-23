import {SorterFactoryInterface} from "../interfaces/factories/SorterFactoryInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";
import {Sorter} from "../database/Sorter";
import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";

export class SorterFactory extends AbstractFactory implements SorterFactoryInterface {
	create<T>(
		comparisonElements: Array<SorterComparisonElementInterface>
	): (a: T, b: T) => number {
		const sorter = new Sorter(comparisonElements);

		return sorter.getSortingFunction.bind(sorter) as (a: T, b: T) => number;
	}
}
