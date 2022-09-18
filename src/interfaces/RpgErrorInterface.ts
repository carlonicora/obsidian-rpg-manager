import {Id} from "../database/Id";

export interface RpgErrorInterface {
	idMap: Id;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;
}
