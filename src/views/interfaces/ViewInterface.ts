import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";

export interface ViewInterface {
	render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;

	addEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentInterface,
		identifier: string,
	): void;

	addRelationshipEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentInterface,
		identifier: string,
	): void;
}
