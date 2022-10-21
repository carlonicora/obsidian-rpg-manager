import {SearchResultInterface} from "./SearchResultInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";

export interface SearchWorkerInterface {
	search(
		term: string,
	): Array<SearchResultInterface>;
}
