import {SearchResultInterface} from "./SearchResultInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface SearchWorkerInterface {
	search(
		term: string,
	): Array<SearchResultInterface>;
}
