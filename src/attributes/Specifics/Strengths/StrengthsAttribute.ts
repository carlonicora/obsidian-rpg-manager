import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { StrengthsBrowseComponent } from "./StrengthsBrowseComponent";
import { StrengthsEditComponent } from "./StrengthsEditComponent";
import { StrengthsViewComponent } from "./StrengthsViewComponent";

export class StrengthsAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): StrengthsAttribute {
		return new StrengthsAttribute({
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
			[AttributeComponentType.Browse]: StrengthsBrowseComponent,
			[AttributeComponentType.View]: StrengthsViewComponent,
			[AttributeComponentType.Edit]: StrengthsEditComponent,
		};
	}

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
