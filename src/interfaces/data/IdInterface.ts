import {DataType} from "../../enums/DataType";
import {TagValueInterface} from "../TagValueInterface";
import {TagStatus} from "../../enums/TagStatus";

export interface IdInterface {
	type: DataType;
	tagMap: Map<DataType, TagValueInterface>;
	tag: string;

	addValue(
		type: DataType,
		value: string|undefined,
	): void;

	get isValid(
	): boolean;

	isTypeValid(
		type: DataType,
	): boolean;

	get invalidIds(
	): Map<DataType, TagStatus>|undefined;

	get possiblyNotFoundIds(
	): Map<DataType, number>|undefined;

	getTypeValue(
		type: DataType,
	): number;
}
