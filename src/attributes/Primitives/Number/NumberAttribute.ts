import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { NumberBrowseComponent } from "./NumberBrowseComponent";
import { NumberEditComponent } from "./NumberEditComponent";
import { NumberViewComponent } from "./NumberViewComponent";

export class NumberAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): NumberAttribute {
		return new NumberAttribute({
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
			[AttributeComponentType.Browse]: NumberBrowseComponent,
			[AttributeComponentType.View]: NumberViewComponent,
			[AttributeComponentType.Edit]: NumberEditComponent,
		};
	}

	get value(): number | undefined {
		return this._value;
	}

	set value(value: number | undefined) {
		this._value = value;
	}
}
