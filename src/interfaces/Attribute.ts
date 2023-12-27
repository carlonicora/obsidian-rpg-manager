import { ReactElement } from "react";
import { AttributeComponentType } from "src/enums/AttributeComponentType";
import { AttributeType } from "src/enums/AttributeType";
import { ElementType } from "src/enums/ElementType";
import { Element } from "./Element";

export type Attribute = {
	id: string;
	components: () => {
		[key in AttributeComponentType]: (props: { element: Element; attribute: Attribute }) => ReactElement;
	};
	type?: AttributeType;
	limitToTypes?: ElementType[];
	isCustom?: boolean;
	options?: string[];
	customName?: string;
	cloneWithValue: (value?: any) => Attribute;

	get value(): any | undefined;
	set value(value: any | undefined);
};
