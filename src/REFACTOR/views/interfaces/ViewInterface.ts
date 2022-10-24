import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface ViewInterface {
	render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;

	addEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentModelInterface,
		identifier: string,
	): void;

	addRelationshipEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentModelInterface,
		identifier: string,
	): void;
}
