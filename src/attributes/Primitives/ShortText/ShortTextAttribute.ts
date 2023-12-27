import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { ShortTextBrowseComponent } from "./ShortTextBrowseComponent";
import { ShortTextEditComponent } from "./ShortTextEditComponent";
import { ShortTextViewComponent } from "./ShortTextViewComponent";

export class ShortTextAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): ShortTextAttribute {
		return new ShortTextAttribute({
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
			[AttributeComponentType.Browse]: ShortTextBrowseComponent,
			[AttributeComponentType.View]: ShortTextViewComponent,
			[AttributeComponentType.Edit]: ShortTextEditComponent,
		};
	}

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
