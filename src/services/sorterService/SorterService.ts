import {SorterServiceInterface} from "./interfaces/SorterServiceInterface";
import {Sorter} from "./Sorter";
import {SorterComparisonElementInterface} from "./interfaces/SorterComparisonElementInterface";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";

export class SorterService extends AbstractService implements SorterServiceInterface, ServiceInterface {
	create<T>(
		comparisonElements: SorterComparisonElementInterface[]
	): (a: T, b: T) => number {
		const sorter = new Sorter(comparisonElements);

		return sorter.getSortingFunction.bind(sorter) as (a: T, b: T) => number;
	}
}
