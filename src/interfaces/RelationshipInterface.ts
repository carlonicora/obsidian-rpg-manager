import {RpgDataInterface} from "./data/RpgDataInterface";

export interface RelationshipInterface {
	component: RpgDataInterface|undefined,
	description: string,
	isReverse: boolean,
	isInFrontmatter: boolean,
}
