import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";

export class Session extends AbstractOutlineData implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;
	public note: NoteInterface|null=null;

	protected loadData(
	): void {
		this.sessionId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		this.date = this.initialiseDate(this.frontmatter?.dates?.session);
		this.irl = this.initialiseDate(this.frontmatter?.dates?.irl);

		super.loadData();
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = this.app.plugins.getPlugin('rpg-manager').database.readSingle<AdventureInterface>(database, DataType.Adventure, this.tag);

		try {
			this.previousSession = this.app.plugins.getPlugin('rpg-manager').database.readSingle<SessionInterface>(database, DataType.Session, this.tag, this.sessionId - 1);
			this.previousSession.nextSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextSession = this.app.plugins.getPlugin('rpg-manager').database.readSingle<SessionInterface>(database, DataType.Session, this.tag, this.sessionId + 1);
			this.nextSession.previousSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.note = this.app.plugins.getPlugin('rpg-manager').database.readSingle<NoteInterface>(database, DataType.Note, this.tag);
		} catch (e) {
			//ignore. It can be non existing
		}
	}
}
