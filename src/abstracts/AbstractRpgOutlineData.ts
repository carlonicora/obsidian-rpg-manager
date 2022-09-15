import {AbstractRpgData} from "./AbstractRpgData";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";

export abstract class AbstractRpgOutlineData extends AbstractRpgData implements RpgDataInterface{
	public isOutline = true;
}
