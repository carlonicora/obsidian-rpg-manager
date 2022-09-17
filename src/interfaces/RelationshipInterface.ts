import {RecordInterface} from "./database/RecordInterface";

export interface RelationshipInterface {
	component?: RecordInterface|undefined,
	description: string,
	isReverse: boolean,
	isInFrontmatter?: boolean|undefined,
}
