import { ReactElement } from "react-markdown/lib/react-markdown";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { Attribute } from "src/interfaces/Attribute";
import { Element } from "src/interfaces/Element";
import { AbstractAttribute } from "../../AbstractAttribute";
import { StoryCircleBrowseComponent } from "./StoryCircleBrowseComponent";
import { StoryCircleEditComponent } from "./StoryCircleEditComponent";
import { StoryCircleViewComponent } from "./StoryCircleViewComponent";

export type StoryCicleValue = {
	you: string;
	need: string;
	go: string;
	search: string;
	find: string;
	take: string;
	return: string;
	change: string;
};

export class StoryCircleAttribute extends AbstractAttribute implements Attribute {
	cloneWithValue(value?: any): StoryCircleAttribute {
		return new StoryCircleAttribute({
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
			[AttributeComponentType.Browse]: StoryCircleBrowseComponent,
			[AttributeComponentType.View]: StoryCircleViewComponent,
			[AttributeComponentType.Edit]: StoryCircleEditComponent,
		};
	}

	get value(): StoryCicleValue | undefined {
		return this._value;
	}

	set value(value: StoryCicleValue | undefined) {
		this._value = value;
	}
}
