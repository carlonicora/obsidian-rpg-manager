import {AbstractFactory} from "../../../factories/abstracts/AbstractFactory";
import {EditableContentValueFactoryInterface} from "../interfaces/EditableContentValueFactoryInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {EditableContentType} from "../enums/EditableContentType";

export class EditableContentValueFactory extends AbstractFactory implements EditableContentValueFactoryInterface {
	read(
		component: ComponentInterface,
		type: EditableContentType,
	): string|boolean|number|undefined {
		let response: string|boolean|number|undefined = undefined;

		switch (type){
			case EditableContentType.Synopsis:
				response = component.synopsis;
				break;
		}

		return response;
	}
}
