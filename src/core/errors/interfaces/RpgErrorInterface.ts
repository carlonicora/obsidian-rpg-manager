import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";

export interface RpgErrorInterface {
	index: IndexInterface|undefined;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;

	showErrorActions(
	): string

	getErrorLinks(
	): string[]|undefined;
}
