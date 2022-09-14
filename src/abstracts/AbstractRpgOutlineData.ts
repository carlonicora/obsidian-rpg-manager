import {AbstractRpgGenericData} from "./AbstractRpgGenericData";
import {RpgOutlineDataInterface} from "../interfaces/data/RpgOutlineDataInterface";

export abstract class AbstractRpgOutlineData extends AbstractRpgGenericData implements RpgOutlineDataInterface{
	public isOutline = true;
}
