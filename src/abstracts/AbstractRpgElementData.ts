import {AbstractRpgGenericData} from "./AbstractRpgGenericData";
import {RpgElementDataInterface} from "../interfaces/data/RpgElementDataInterface";

export abstract class AbstractRpgElementData extends AbstractRpgGenericData implements RpgElementDataInterface{
	public isOutline = false;
}
