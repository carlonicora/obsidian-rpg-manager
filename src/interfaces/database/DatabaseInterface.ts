import {RecordInterface} from "./RecordInterface";
import {IdInterface} from "../data/IdInterface";
import {DataType} from "../../enums/DataType";

export interface DatabaseInterface {
	elements: RecordInterface[];

	create(
		data: RecordInterface,
	): void;

	ready(
	): void;

	read(
		query?: any,
		comparison?: any,
	): Array<RecordInterface>;

	update(
		data: RecordInterface,
	): void;

	delete(
		data: RecordInterface|string,
	): boolean;

	readByPath<T extends RecordInterface>(
		name: string,
	): T|undefined;

	readSingle<T extends RecordInterface>(
		type: DataType,
		id: IdInterface,
		overloadId?: number|undefined,
	): T;

	readList<T extends RecordInterface>(
		type: DataType,
		id: IdInterface|undefined,
		comparison?: any|undefined,
		overloadId?: number|undefined,
	): Array<T>;
}
