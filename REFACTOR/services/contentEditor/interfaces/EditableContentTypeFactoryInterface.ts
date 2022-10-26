import {EditableContentType} from "../enums/EditableContentType";

export interface EditableContentTypeFactoryInterface {
	create(
		editableField: string,
	): EditableContentType|undefined;
}
