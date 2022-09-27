import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {ActInterface} from "../interfaces/components/ActInterface";
import {AdventureInterface} from "../interfaces/components/AdventureInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentType} from "../enums/ComponentType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {AbtStage} from "../enums/AbtStage";

export class Act extends AbstractComponentOutline implements ActInterface {
	public actId: number;

	public adventure: AdventureInterface;
	public previousAct: ActInterface|null=null;
	public nextAct: ActInterface|null=null;
	public abtStage: AbtStage|undefined=undefined;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const actId = this.id.actId;
		if (actId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.actId = actId;

		if (frontmatter?.abtStage !== undefined){
			this.abtStage = AbtStage[frontmatter.abtStage as keyof typeof AbtStage];
		}

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(ComponentType.Adventure, this.id);

		try {
			const query = database.read<ActInterface>((record: ComponentInterface) =>
				record.id.type === ComponentType.Act &&
				record.id.campaignId === this.id.campaignId &&
				record.id.actId === this.actId - 1);
			if (query.length === 1) {
				this.previousAct = query[0];
				this.previousAct.nextAct = this;
			}
		} catch (e) {
			//ignore. It can be non existing
		}

		try {const query = database.read<ActInterface>((record: ComponentInterface) =>
			record.id.type === ComponentType.Act &&
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
