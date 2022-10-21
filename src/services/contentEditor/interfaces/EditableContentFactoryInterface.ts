import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";

export interface EditableContentFactoryInterface {
	open(
		component: ComponentInterface,
		editableField: string,
	): Promise<boolean>;
}
