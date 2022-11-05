import {SearchResultInterface} from "./SearchResultInterface";
import {SearchType} from "../enums/SearchType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface SearchServiceInterface {
	search(
		term: string,
		type: SearchType,
		element?: ModelInterface,
		searchOnlyAliases?: string,
	): Array<SearchResultInterface>;
}
