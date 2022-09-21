import {DataType} from "../../enums/DataType";
import {TagValueInterface} from "../TagValueInterface";
import {TagStatus} from "../../enums/TagStatus";

export interface IdInterface {
	type: DataType;
	tagMap: Map<DataType, TagValueInterface>;
	tag: string;

	get id(
	):number;

	set id(
		id: number,
	);

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
