import {AbstractRpgData} from "./AbstractRpgData";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export abstract class AbstractRpgElementData extends AbstractRpgData implements RpgDataInterface{
	public isOutline = false;
}
