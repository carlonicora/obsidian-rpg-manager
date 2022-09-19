import {Id} from "../database/Id";

export interface RpgErrorInterface {
	idMap: Id;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;

	showErrorActions(
	): string

	getErrorLinks(
	): Array<string>|undefined;
}
