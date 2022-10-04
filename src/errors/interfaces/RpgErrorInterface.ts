import {IdInterface} from "../../databases/interfaces/IdInterface";

export interface RpgErrorInterface {
	id: IdInterface;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;

	showErrorActions(
	): string

	getErrorLinks(
	): Array<string>|undefined;
}
