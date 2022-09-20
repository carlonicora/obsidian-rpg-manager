import {RecordInterface} from "./database/RecordInterface";

export interface RelationshipInterface {
	component?: RecordInterface|undefined,
	description: string,
	isInFrontmatter?: boolean|undefined,
}
