import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface EditableContentFactoryInterface {
	open(
		component: ComponentModelInterface,
		editableField: string,
	): Promise<boolean>;
}
