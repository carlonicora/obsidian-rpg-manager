import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface OldViewInterface {
	render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;

	addEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ModelInterface,
		identifier: string,
	): void;

	addRelationshipEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ModelInterface,
		identifier: string,
	): void;
}
