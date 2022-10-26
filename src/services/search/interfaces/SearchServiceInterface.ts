import {SearchResultInterface} from "./SearchResultInterface";
import {SearchType} from "../enums/SearchType";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface SearchServiceInterface {
	search(
		term: string,
		type: SearchType,
		element?: ModelInterface,
	): Array<SearchResultInterface>;
}
