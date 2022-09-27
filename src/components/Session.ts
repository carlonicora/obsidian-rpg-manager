import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {SessionInterface} from "../interfaces/components/SessionInterface";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentType} from "../enums/ComponentType";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {AbtStage} from "../enums/AbtStage";

export class Session extends AbstractComponentOutline implements SessionInterface {
	public sessionId: number;

	public date: Date|null;
	public irl: Date|null;

	public previousSession: SessionInterface|null=null;
	public nextSession: SessionInterface|null=null;

	public abtStage: AbtStage|undefined=undefined;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const sessionId = this.id.sessionId;
		if (sessionId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.sessionId = sessionId;
		this.date = this.initialiseDate(frontmatter?.dates?.act);
		this.irl = this.initialiseDate(frontmatter?.dates?.irl);

		if (frontmatter?.abt !== undefined){
			this.abtStage = AbtStage[frontmatter.abt as keyof typeof AbtStage];
		}

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		try {
			const query = database.read<SessionInterface>((record: ComponentInterface) =>
				record.id.type === ComponentType.Act &&
				record.id.campaignId === this.id.campaignId &&
				record.id.sessionId === this.sessionId - 1);
			if (query.length === 1) {
				this.previousSession = query[0];
				this.previousSession.nextSession = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}

		try {const query = database.read<SessionInterface>((record: ComponentInterface) =>
			record.id.type === ComponentType.Act &&
			record.id.campaignId === this.id.campaignId &&
			record.id.sessionId === this.sessionId + 1);
			if (query.length === 1) {
				this.nextSession = query[0];
				this.nextSession.previousSession = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}
	}
}
