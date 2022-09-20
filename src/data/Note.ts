import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";

export class Note extends AbstractOutlineRecord implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(DataType.Adventure, this.id.tag);
		this.sessionId = this.id.getTypeValue(DataType.Session);
	}
}
