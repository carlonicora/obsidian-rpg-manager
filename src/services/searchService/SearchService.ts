import {SearchServiceInterface} from "./interfaces/SearchServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {SearchType} from "./enums/SearchType";
import {SearchResultInterface} from "./interfaces/SearchResultInterface";
import {SearchWorkerInterface} from "./interfaces/SearchWorkerInterface";
import {FuzzyFileSearchWorker} from "./workers/FuzzyFileSearchWorker";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {FuzzyElementSearchWorker} from "./workers/FuzzyElementSearchWorker";
import {ComponentType} from "../../core/enums/ComponentType";

export class SearchService extends AbstractService implements SearchServiceInterface, ServiceInterface {
	public search(
		term: string,
		type: SearchType = SearchType.FuzzyFileSearch,
		element?: ModelInterface,
		searchOnlyAliases?: string,
		componentType?: ComponentType,
	): Array<SearchResultInterface> {
		let worker: SearchWorkerInterface;

		switch (type){
			case SearchType.FuzzyFileSearch:
				worker = new FuzzyFileSearchWorker(this.api);
				break;
			case SearchType.FuzzyElementSearch:
				if (element !== undefined)
					worker = new FuzzyElementSearchWorker(this.api, element, componentType);
				else
					worker = new FuzzyFileSearchWorker(this.api);

				break;
		}

		return worker.search(term, searchOnlyAliases);
	}
}
