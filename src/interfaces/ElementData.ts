import { ElementType } from "src/enums/ElementType";

export type ElementData = {
	id: string;
	path: string;
	type: ElementType;
	campaignId?: string;
	parentId?: string;
	positionInParent?: number;
	attributes: { [key: string]: string | number | boolean }[];
	relationships: { [key: string]: string[] };
};
