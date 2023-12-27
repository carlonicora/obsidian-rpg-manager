import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { BooleanBrowseComponent } from "./BooleanBrowseComponent";
import { BooleanEditComponent } from "./BooleanEditComponent";
import { BooleanViewComponent } from "./BooleanViewComponent";

export class BooleanAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): BooleanAttribute {
		return new BooleanAttribute({
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
			[AttributeComponentType.Browse]: BooleanBrowseComponent,
			[AttributeComponentType.View]: BooleanViewComponent,
			[AttributeComponentType.Edit]: BooleanEditComponent,
		};
	}

	get value(): boolean | undefined {
		return this._value;
	}

	set value(value: boolean | undefined) {
		this._value = value;
	}
}
