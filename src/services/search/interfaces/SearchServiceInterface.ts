import {SearchResultInterface} from "./SearchResultInterface";
import {SearchType} from "../enums/SearchType";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";

export interface SearchServiceInterface {
	search(
		term: string,
		type: SearchType,
		element?: ComponentInterface,
	): Array<SearchResultInterface>;
}
