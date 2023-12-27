import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { CheckboxBrowseComponent } from "./CheckboxBrowseComponent";
import { CheckboxEditComponent } from "./CheckboxEditComponent";
import { CheckboxViewComponent } from "./CheckboxViewComponent";

export class CheckboxAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): CheckboxAttribute {
		return new CheckboxAttribute({
			id: this.id,
			type: this.type,
			limitToTypes: this.limitToTypes,
			isCustom: this.isCustom,
			options: this.options,
			customName: this.customName,
			value: value,
		});
	}

	components(): {
		[key in AttributeComponentType]: (props: { element: Element; attribute: Attribute }) => ReactElement;
	} {
		return {
			[AttributeComponentType.Browse]: CheckboxBrowseComponent,
			[AttributeComponentType.View]: CheckboxViewComponent,
			[AttributeComponentType.Edit]: CheckboxEditComponent,
		};
	}

	get value(): boolean | undefined {
		return this._value;
	}

	set value(value: boolean | undefined) {
		this._value = value;
	}
}
