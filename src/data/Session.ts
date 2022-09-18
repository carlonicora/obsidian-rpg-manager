import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";

export class Session extends AbstractOutlineRecord implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;
	public note: NoteInterface|null=null;

	protected initialiseData(
	): void {
		this.sessionId = this.id.getTypeValue(DataType.Session);
		this.date = this.initialiseDate(this.frontmatter?.dates?.session);
		this.irl = this.initialiseDate(this.frontmatter?.dates?.irl);

		super.initialiseData();
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(DataType.Adventure, this.id.tag);

		try {
			this.previousSession = database.readSingle<SessionInterface>(DataType.Session, this.id.tag, this.sessionId - 1);
			this.previousSession.nextSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextSession = database.readSingle<SessionInterface>(DataType.Session, this.id.tag, this.sessionId + 1);
			this.nextSession.previousSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.note = database.readSingle<NoteInterface>(DataType.Note, this.id.tag);
		} catch (e) {
			//ignore. It can be non existing
		}
	}
}
