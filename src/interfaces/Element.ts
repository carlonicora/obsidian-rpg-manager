import { ElementType } from "src/enums/ElementType";
import { ElementData } from "./ElementData";
import { Relationship } from "./Relationship";

export type Element = {
	data: ElementData;

	get id(): string;
	get path(): string;
	get type(): ElementType;
	get campaign(): Element | undefined;
	get parent(): Element | undefined;
	get positionInParent(): number;
	get name(): string;
	get version(): number;
	get relationships(): Relationship[];
	attribute(attributeName: string): any | undefined;
};
