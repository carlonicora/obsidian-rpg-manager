import { AttributeComponentType } from "../enums/AttributeComponentType";
import { ElementType } from "../enums/ElementType";

export interface AttributeInterface {
	id: string;
	type: AttributeComponentType;
	value?: any;
	isSet?: boolean;
	isCustom?: boolean;
	options?: string[];
	customName?: string;
	customTypes?: ElementType[];
}
