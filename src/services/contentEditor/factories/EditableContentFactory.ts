import {AbstractFactory} from "../../../factories/abstracts/AbstractFactory";
import {EditableContentFactoryInterface} from "../interfaces/EditableContentFactoryInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {ContentEditorModal} from "../modals/ContentEditorModal";
import {EditableContentType} from "../enums/EditableContentType";

export class EditableContentFactory extends AbstractFactory implements EditableContentFactoryInterface {
	public async open(
		component: ComponentInterface,
		editableField: string,
	): Promise<boolean> {
		const type: EditableContentType|undefined = await this.factories.editableContentField.create(editableField);

		switch(type){
			case EditableContentType.Synopsis:
				new ContentEditorModal(this.app, component, type, editableField).open();
				return true;
				break;
		}

		return false;
	}
}
