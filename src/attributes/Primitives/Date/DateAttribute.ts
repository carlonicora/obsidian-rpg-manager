import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { DateBrowseComponent } from "./DateBrowseComponent";
import { DateEditComponent } from "./DateEditComponent";
import { DateViewComponent } from "./DateViewComponent";

export class DateAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): DateAttribute {
		return new DateAttribute({
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
			[AttributeComponentType.Browse]: DateBrowseComponent,
			[AttributeComponentType.View]: DateViewComponent,
			[AttributeComponentType.Edit]: DateEditComponent,
		};
	}

	get value(): Date | undefined {
		return this._value;
	}

	set value(value: Date | undefined) {
		this._value = value;
	}
}
