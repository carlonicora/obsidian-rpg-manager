import {RecordInterface} from "./RecordInterface";

export interface DatabaseInterface {
	elements: RecordInterface[];

	create(
		data: RecordInterface,
	): void;

	read(
		query: any,
		comparison: any,
	): Array<RecordInterface>;

	update(
		data: RecordInterface,
	): void;

	delete(
		data: RecordInterface|string,
	): boolean;
}
