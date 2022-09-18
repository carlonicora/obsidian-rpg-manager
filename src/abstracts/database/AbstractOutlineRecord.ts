import {AbstractRecord} from "./AbstractRecord";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {DatabaseInterface} from "../../interfaces/database/DatabaseInterface";
import {ElementDuplicatedError} from "../../errors/ElementDuplicatedError";

export abstract class AbstractOutlineRecord extends AbstractRecord implements RecordInterface{
	public isOutline = true;

	public checkDuplicates(
		database: DatabaseInterface,
	): void {

		const query = (data: RecordInterface) =>
			data.type === this.idMap.type &&
			data.tag === this.tag;
		const elements = database.read(query);

		if (elements.length > 0) throw new ElementDuplicatedError(this.app, this.idMap);
	}
}
