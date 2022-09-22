import {RecordType} from "../../enums/RecordType";
import {TagValueInterface} from "../TagValueInterface";
import {TagStatus} from "../../enums/TagStatus";

export interface IdInterface {
	type: RecordType;
	tagMap: Map<RecordType, TagValueInterface>;

	get id(
	):number;

	set id(
		id: number,
	);

	get tag(
	): string;

	get campaignId(
	): number;

	get adventureId(
	): number|undefined;

	get actId(
	): number|undefined;

	get sceneId(
	): number|undefined;

	get sessionId(
	): number|undefined;

	get isValid(
	): boolean;

	isTypeValid(
		type: RecordType,
	): boolean;

	get invalidIds(
	): Map<RecordType, TagStatus>|undefined;

	get possiblyNotFoundIds(
	): Map<RecordType, number>|undefined;

	getTypeValue(
		type: RecordType,
	): number|undefined;
}
