import { Element } from "./Element";
import { Relationship } from "./Relationship";

export type DatabaseStructure = {
	elements: Element[];
	relationships: Relationship[];
};
