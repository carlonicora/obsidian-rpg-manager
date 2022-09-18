import {TagValidator} from "../helpers/TagValidator";

export interface RpgErrorInterface {
	idMap: TagValidator;

	showErrorMessage(
	): string;
}
