import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { ConflictBrowseComponent } from "./ConflictBrowseComponent";
import { ConflictEditComponent } from "./ConflictEditComponent";
import { ConflictViewComponent } from "./ConflictViewComponent";

export class ConflictAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): ConflictAttribute {
		return new ConflictAttribute({
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
			[AttributeComponentType.Browse]: ConflictBrowseComponent,
			[AttributeComponentType.View]: ConflictViewComponent,
			[AttributeComponentType.Edit]: ConflictEditComponent,
		};
	}

	get value(): any | undefined {
		return this._value;
	}

	set value(value: any | undefined) {
		this._value = value;
	}
}
