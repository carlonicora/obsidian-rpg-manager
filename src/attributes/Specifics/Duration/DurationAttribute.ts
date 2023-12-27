import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { DurationBrowseComponent } from "./DurationBrowseComponent";
import { DurationEditComponent } from "./DurationEditComponent";
import { DurationViewComponent } from "./DurationViewComponent";

export class DurationAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): DurationAttribute {
		return new DurationAttribute({
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
			[AttributeComponentType.Browse]: DurationBrowseComponent,
			[AttributeComponentType.View]: DurationViewComponent,
			[AttributeComponentType.Edit]: DurationEditComponent,
		};
	}

	get value(): number | undefined {
		return this._value;
	}

	set value(value: number | undefined) {
		this._value = value;
	}
}
