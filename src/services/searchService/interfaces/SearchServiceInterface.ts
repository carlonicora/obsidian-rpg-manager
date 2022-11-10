import {SearchResultInterface} from "./SearchResultInterface";
import {SearchType} from "../enums/SearchType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";

export interface SearchServiceInterface {
	search(
		term: string,
		type: SearchType,
		element?: ModelInterface,
		searchOnlyAliases?: string,
		componentType?: ComponentType,
	): Array<SearchResultInterface>;
}
