import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { LinkBrowseComponent } from "./LinkBrowseComponent";
import { LinkEditComponent } from "./LinkEditComponent";
import { LinkViewComponent } from "./LinkViewComponent";

export class LinkAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): LinkAttribute {
		return new LinkAttribute({
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
			[AttributeComponentType.Browse]: LinkBrowseComponent,
			[AttributeComponentType.View]: LinkViewComponent,
			[AttributeComponentType.Edit]: LinkEditComponent,
		};
	}

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
