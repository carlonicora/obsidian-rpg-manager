import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { SensoryImprintBrowseComponent } from "./SensoryImprintBrowseComponent";
import { SensoryImprintEditComponent } from "./SensoryImprintEditComponent";
import { SensoryImprintViewComponent } from "./SensoryImprintViewComponent";

export type SensoryImprintValue = {
	sight: string;
	hear: string;
	touch: string;
	feel: string;
	taste: string;
};

export class SensoryImprintAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): SensoryImprintAttribute {
		return new SensoryImprintAttribute({
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
			[AttributeComponentType.Browse]: SensoryImprintBrowseComponent,
			[AttributeComponentType.View]: SensoryImprintViewComponent,
			[AttributeComponentType.Edit]: SensoryImprintEditComponent,
		};
	}

	get value(): SensoryImprintValue | undefined {
		return this._value;
	}

	set value(value: SensoryImprintValue | undefined) {
		this._value = value;
	}
}
