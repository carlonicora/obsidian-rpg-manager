import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";
import {SessionInterface} from "../interfaces/data/SessionInterface";

export class Note extends AbstractOutlineRecord implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(DataType.Adventure, this.tag);
		const session = database.readSingle<SessionInterface>(DataType.Session, this.tag);
		this.sessionId = session.sessionId;
	}
}
