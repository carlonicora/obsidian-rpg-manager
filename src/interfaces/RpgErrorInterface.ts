import {TagValidator} from "../helpers/TagValidator";

export interface RpgErrorInterface {
	idMap: TagValidator;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;
}
