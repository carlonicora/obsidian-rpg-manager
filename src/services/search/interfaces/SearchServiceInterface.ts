import {SearchResultInterface} from "./SearchResultInterface";
import {SearchType} from "../enums/SearchType";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface SearchServiceInterface {
	search(
		term: string,
		type: SearchType,
		element?: ComponentModelInterface,
	): Array<SearchResultInterface>;
}
