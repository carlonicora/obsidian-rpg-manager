import { SystemType } from "src/data/enums/SystemType";
import { ElementType } from "../enums/ElementType";

export interface IdInterface {
	type: ElementType;
	system?: SystemType;
	campaign?: string;
	parent?: string;
	positionInParent?: number;
}
