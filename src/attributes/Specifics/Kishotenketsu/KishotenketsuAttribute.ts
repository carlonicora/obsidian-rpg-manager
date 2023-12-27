import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { KishotenketsuBrowseComponent } from "./KishotenketsuBrowseComponent";
import { KishotenketsuEditComponent } from "./KishotenketsuEditComponent";
import { KishotenketsuViewComponent } from "./KishotenketsuViewComponent";

export type KishotenketsuValue = {
	ki: string;
	sho: string;
	ten: string;
	ketsu: string;
};

export class KishotenketsuAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): KishotenketsuAttribute {
		return new KishotenketsuAttribute({
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
			[AttributeComponentType.Browse]: KishotenketsuBrowseComponent,
			[AttributeComponentType.View]: KishotenketsuViewComponent,
			[AttributeComponentType.Edit]: KishotenketsuEditComponent,
		};
	}

	get value(): KishotenketsuValue | undefined {
		return this._value;
	}

	set value(value: KishotenketsuValue | undefined) {
		this._value = value;
	}
}
