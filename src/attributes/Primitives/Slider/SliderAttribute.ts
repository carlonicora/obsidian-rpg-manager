import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { SliderBrowseComponent } from "./SliderBrowseComponent";
import { SliderEditComponent } from "./SliderEditComponent";
import { SliderViewComponent } from "./SliderViewComponent";

export class SliderAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): SliderAttribute {
		return new SliderAttribute({
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
			[AttributeComponentType.Browse]: SliderBrowseComponent,
			[AttributeComponentType.View]: SliderViewComponent,
			[AttributeComponentType.Edit]: SliderEditComponent,
		};
	}

	get value(): number | undefined {
		return this._value;
	}

	set value(value: number | undefined) {
		this._value = value;
	}
}
