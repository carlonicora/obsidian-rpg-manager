import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {NoteInterface} from "../interfaces/data/NoteInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordType} from "../enums/RecordType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";

export class Session extends AbstractOutlineRecord implements SessionInterface {
	public sessionId: number;
	public date: Date|null;
	public irl: Date|null;

	public adventure: AdventureInterface;
	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;
	public note: NoteInterface|null=null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const sessionId = this.id.sessionId;
		if (sessionId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.sessionId = sessionId;
		this.date = this.initialiseDate(frontmatter?.dates?.session);
		this.irl = this.initialiseDate(frontmatter?.dates?.irl);

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(RecordType.Adventure, this.id);

		try {
			this.previousSession = database.readSingle<SessionInterface>(RecordType.Session, this.id, this.sessionId - 1);
			this.previousSession.nextSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextSession = database.readSingle<SessionInterface>(RecordType.Session, this.id, this.sessionId + 1);
			this.nextSession.previousSession = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.note = database.readSingle<NoteInterface>(RecordType.Note, this.id);
		} catch (e) {
			//ignore. It can be non existing
		}
	}
}
