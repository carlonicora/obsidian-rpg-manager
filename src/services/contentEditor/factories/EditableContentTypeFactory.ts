import {AbstractFactory} from "../../../factories/abstracts/AbstractFactory";
import {EditableContentTypeFactoryInterface} from "../interfaces/EditableContentTypeFactoryInterface";
import {EditableContentType} from "../enums/EditableContentType";

export class EditableContentTypeFactory extends AbstractFactory implements EditableContentTypeFactoryInterface {
	public create(
		editableField: string,
	): EditableContentType|undefined {
		switch (editableField.toLowerCase()){
			case 'data.synopsis':
				return EditableContentType.Synopsis;
				break;
		}

		return undefined;
	}
}
