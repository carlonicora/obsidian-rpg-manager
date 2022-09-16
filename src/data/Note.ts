import {NoteInterface} from "../interfaces/data/NoteInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";
import {SessionInterface} from "../interfaces/data/SessionInterface";

export class Note extends AbstractOutlineData implements NoteInterface {
	public adventure: AdventureInterface;
	public sessionId: number;

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = this.app.plugins.getPlugin('rpg-manager').database.readSingle<AdventureInterface>(database, DataType.Adventure, this.tag);
		const session = this.app.plugins.getPlugin('rpg-manager').database.readSingle<SessionInterface>(database, DataType.Session, this.tag);
		this.sessionId = session.sessionId;
	}
}
