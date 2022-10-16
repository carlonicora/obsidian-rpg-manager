import {IdInterface} from "../../id/interfaces/IdInterface";

export interface RpgErrorInterface {
	id: IdInterface|undefined;

	getErrorTitle(
	): string|undefined;

	showErrorMessage(
	): string;

	showErrorActions(
	): string

	getErrorLinks(
	): string[]|undefined;
}
