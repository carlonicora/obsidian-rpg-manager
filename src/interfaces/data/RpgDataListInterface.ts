import {RpgDataInterface} from "./RpgDataInterface";

export interface RpgDataListInterface {
	elements: RpgDataInterface[];

	getElement(
		obsidianId: string,
	): RpgDataInterface|null;

	addElement(
		element: RpgDataInterface,
	): void;


	where(
		predicate: any,
	): RpgDataListInterface;

	sort(
		comparatorFunction: any,
	): RpgDataListInterface;
}
