import {SearchResultInterface} from "./SearchResultInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface SearchWorkerInterface {
	search(
		term: string,
	): Array<SearchResultInterface>;
}
