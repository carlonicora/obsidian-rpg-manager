import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {EditableContentType} from "../enums/EditableContentType";

export interface EditableContentValueFactoryInterface {
	read(
		component: ComponentInterface,
		type: EditableContentType,
	): string|boolean|number|undefined;
}
