import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {EditableContentType} from "../enums/EditableContentType";

export interface ContentEditorServiceInterface {
	open(
		component: ModelInterface,
		editableField: string,
	): Promise<boolean>;

	read(
		component: ModelInterface,
		type: EditableContentType,
	): string|boolean|number|undefined;
}
