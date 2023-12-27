import { ElementType } from "src/enums/ElementType";
import { Attribute } from "./Attribute";
import { ElementData } from "./ElementData";
import { Relationship } from "./Relationship";

export type Element = {
	data: ElementData;

	get id(): string;
	get path(): string;
	set path(path: string);
	get type(): ElementType;
	get campaign(): Element | undefined;
	get parent(): Element | undefined;
	get positionInParent(): number;
	get name(): string;
	get version(): number;
	get relationships(): Relationship[];
	get attributes(): Attribute[];
	attribute(id: string): Attribute;
};
