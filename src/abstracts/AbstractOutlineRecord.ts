import {AbstractRecord} from "./AbstractRecord";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ElementDuplicatedError} from "../errors/ElementDuplicatedError";
import {ElementNotFoundError} from "../errors/ElementNotFoundError";

export abstract class AbstractOutlineRecord extends AbstractRecord implements RecordInterface{
	public isOutline = true;

	public checkDuplicates(
		database: DatabaseInterface,
	): void {
		try {
			const duplicate = database.readSingle(this.id.type, this.id);
			throw new ElementDuplicatedError(this.app, this.id, [duplicate], this);
		} catch (e) {
			if (e instanceof ElementNotFoundError === false) {
				throw e;
			}
		}
	}
}
