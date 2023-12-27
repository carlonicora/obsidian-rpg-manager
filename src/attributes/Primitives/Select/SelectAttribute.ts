import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { SelectBrowseComponent } from "./SelectBrowseComponent";
import { SelectEditComponent } from "./SelectEditComponent";
import { SelectViewComponent } from "./SelectViewComponent";

export class SelectAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): SelectAttribute {
		return new SelectAttribute({
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
			[AttributeComponentType.Browse]: SelectBrowseComponent,
			[AttributeComponentType.View]: SelectViewComponent,
			[AttributeComponentType.Edit]: SelectEditComponent,
		};
	}

	get value(): string | undefined {
		return this._value;
	}

	set value(value: string | undefined) {
		this._value = value;
	}
}
