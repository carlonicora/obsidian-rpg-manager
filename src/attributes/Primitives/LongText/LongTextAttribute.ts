import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { LongTextBrowseComponent } from "./LongTextBrowseComponent";
import { LongTextEditComponent } from "./LongTextEditComponent";
import { LongTextViewComponent } from "./LongTextViewComponent";

export class LongTextAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): LongTextAttribute {
		return new LongTextAttribute({
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
			[AttributeComponentType.Browse]: LongTextBrowseComponent,
			[AttributeComponentType.View]: LongTextViewComponent,
			[AttributeComponentType.Edit]: LongTextEditComponent,
		};
	}

	get value(): string | undefined {
		return this._value;
	}

	set value(value: string | undefined) {
		this._value = value;
	}
}
