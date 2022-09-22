import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordType} from "../enums/RecordType";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";

export class Note extends AbstractOutlineRecord implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(RecordType.Adventure, this.id);
		const sessionId = this.id.sessionId;
		if (sessionId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.sessionId = sessionId;
	}
}
