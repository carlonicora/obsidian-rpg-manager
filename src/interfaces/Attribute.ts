import { ElementType } from "react";
import { AttributeType } from "src/enums/AttributeType";

export type Attribute = {
	id: string;
	type: AttributeType;
	value?: any;
	isSet?: boolean;
	isCustom?: boolean;
	options?: string[];
	customName?: string;
	customTypes?: ElementType[];
};
