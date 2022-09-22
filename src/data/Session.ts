import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordType} from "../enums/RecordType";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export class Session extends AbstractOutlineRecord implements SessionInterface {
	public sessionId: number;

	public date: Date|null;
	public irl: Date|null;

	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const sessionId = this.id.sessionId;
		if (sessionId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.sessionId = sessionId;
		this.date = this.initialiseDate(frontmatter?.dates?.act);
		this.irl = this.initialiseDate(frontmatter?.dates?.irl);

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		try {
			const query = database.read<SessionInterface>((record: RecordInterface) =>
				record.id.type === RecordType.Act &&
				record.id.campaignId === this.id.campaignId &&
				record.id.sessionId === this.sessionId - 1);
			if (query.length === 1) {
				this.previousSession = query[0];
				this.previousSession.nextSession = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}

		try {const query = database.read<SessionInterface>((record: RecordInterface) =>
			record.id.type === RecordType.Act &&
			record.id.campaignId === this.id.campaignId &&
			record.id.sessionId === this.sessionId + 1);
			if (query.length === 1) {
				this.nextSession = query[0];
				this.nextSession.previousSession = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}

		/*
		try {
			this.note = database.readSingle<NoteInterface>(RecordType.Note, this.id);
		} catch (e) {
			//ignore. It can be non existing
		}
		*/
	}
}
