import {AbstractRecord} from "./AbstractRecord";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export abstract class AbstractElementRecord extends AbstractRecord implements RecordInterface {
	public isOutline = false;
}
