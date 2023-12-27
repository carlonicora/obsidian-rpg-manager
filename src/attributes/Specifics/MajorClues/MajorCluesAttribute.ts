import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { MajorCluesBrowseComponent } from "./MajorCluesBrowseComponent";
import { MajorCluesEditComponent } from "./MajorCluesEditComponent";
import { MajorCluesViewComponent } from "./MajorCluesViewComponent";

export type MajorCluesValue = {
	you: string;
	need: string;
	go: string;
	search: string;
	find: string;
	take: string;
	return: string;
	change: string;
};

export class MajorCluesAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): MajorCluesAttribute {
		return new MajorCluesAttribute({
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
			[AttributeComponentType.Browse]: MajorCluesBrowseComponent,
			[AttributeComponentType.View]: MajorCluesViewComponent,
			[AttributeComponentType.Edit]: MajorCluesEditComponent,
		};
	}

	get value(): MajorCluesValue | undefined {
		return this._value;
	}

	set value(value: MajorCluesValue | undefined) {
		this._value = value;
	}
}
