import {SorterFactoryInterface} from "./interfaces/SorterFactoryInterface";
import {AbstractFactory} from "../../../REFACTOR/abstracts/AbstractFactory";
import {Sorter} from "../Sorter";
import {SorterComparisonElementInterface} from "../interfaces/SorterComparisonElementInterface";

export class SorterFactory extends AbstractFactory implements SorterFactoryInterface {
	create<T>(
		comparisonElements: SorterComparisonElementInterface[]
	): (a: T, b: T) => number {
		const sorter = new Sorter(comparisonElements);

		return sorter.getSortingFunction.bind(sorter) as (a: T, b: T) => number;
	}
}
