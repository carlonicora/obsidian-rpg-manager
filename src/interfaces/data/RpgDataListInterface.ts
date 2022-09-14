import {RpgDataInterface} from "./RpgDataInterface";
import {RpgOutlineDataInterface} from "./RpgOutlineDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface RpgDataListInterface {
	elements: RpgDataInterface[];

	getElement(
		path: string,
	): RpgDataInterface|null;

	addElement(
		element: RpgDataInterface,
	): void;

	removeElement(
		path: string
	): boolean;


	where(
		predicate: any,
	): RpgDataListInterface;

	sort(
		comparatorFunction: any,
	): RpgDataListInterface;
}
