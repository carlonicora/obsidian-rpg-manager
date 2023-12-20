import { ElementType } from "react";
import { Element } from "./Element";
import { Relationship } from "./Relationship";

export type RPGManager = {
	initialise(): Promise<void>;
	persist(): Promise<void>;
	getById: (id: string) => Element | undefined;
	getByPath: (path: string) => Element | undefined;
	getChildren: (root: Element, type: ElementType) => Element[];
	getRelationships: (element: Element) => Relationship[];
};
