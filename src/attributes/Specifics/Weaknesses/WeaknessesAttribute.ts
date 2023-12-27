import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { WeaknessesBrowseComponent } from "./WeaknessesBrowseComponent";
import { WeaknessesEditComponent } from "./WeaknessesEditComponent";
import { WeaknessesViewComponent } from "./WeaknessesViewComponent";

export class WeaknessesAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): WeaknessesAttribute {
		return new WeaknessesAttribute({
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
			[AttributeComponentType.Browse]: WeaknessesBrowseComponent,
			[AttributeComponentType.View]: WeaknessesViewComponent,
			[AttributeComponentType.Edit]: WeaknessesEditComponent,
		};
	}

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
