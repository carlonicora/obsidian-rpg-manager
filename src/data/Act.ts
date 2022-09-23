import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {ActInterface} from "../interfaces/data/ActInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordType} from "../enums/RecordType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export class Act extends AbstractOutlineRecord implements ActInterface {
	public actId: number;

	public adventure: AdventureInterface;
	public previousAct: ActInterface|null=null;
	public nextAct: ActInterface|null=null;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const actId = this.id.actId;
		if (actId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.actId = actId;

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(RecordType.Adventure, this.id);

		try {
			const query = database.read<ActInterface>((record: RecordInterface) =>
				record.id.type === RecordType.Act &&
				record.id.campaignId === this.id.campaignId &&
				record.id.actId === this.actId - 1);
			if (query.length === 1) {
				this.previousAct = query[0];
				this.previousAct.nextAct = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}

		try {const query = database.read<ActInterface>((record: RecordInterface) =>
			record.id.type === RecordType.Act &&
			record.id.campaignId === this.id.campaignId &&
			record.id.actId === this.actId + 1);
			if (query.length === 1) {
				this.nextAct = query[0];
				this.nextAct.previousAct = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}
	}
}
