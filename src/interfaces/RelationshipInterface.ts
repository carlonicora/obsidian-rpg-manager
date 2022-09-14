import {RpgOutlineDataInterface} from "./data/RpgOutlineDataInterface";
import {RpgElementDataInterface} from "./data/RpgElementDataInterface";
import {RpgDataInterface} from "./data/RpgDataInterface";

export interface RelationshipInterface {
	component: RpgOutlineDataInterface|RpgElementDataInterface|RpgDataInterface|undefined,
	description: string,
	isReverse: boolean,
}
