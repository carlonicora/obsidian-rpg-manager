import {RecordInterface} from "./database/RecordInterface";
import {RelationshipType} from "../enums/RelationshipType";

export interface RelationshipInterface {
	component?: RecordInterface|undefined,
	description: string,
	type: RelationshipType,
}
