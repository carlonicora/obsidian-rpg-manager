import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {IoFactory, SingleIoKey} from "../factories/Iofactory";
import {App} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {RpgFunctions} from "../RpgFunctions";
import {DataFactory, SingleDataKey} from "../factories/DataFactory";
import {SessionDataInterface} from "../interfaces/data/SessionDataInterface";
import {SceneDataInterface} from "../interfaces/data/SceneDataInterface";

export abstract class AbstractModel implements ModelInterface {
	protected io: IoInterface;

	protected dataType: DataType|null;
	protected specificData: GenericDataInterface;

	constructor(
		protected app: App,
		protected campaign: CampaignDataInterface,
		protected current: Record<string, any>,
		private dv: DataviewInlineApi,
		protected source: string,
	) {
		this.io = IoFactory.create(CampaignSetting[this.campaign.settings] + 'Io' as SingleIoKey<any>, this.app, this.campaign, this.dv, this.current);

		this.dataType = RpgFunctions.getDataType(this.current.tags)
		if (this.dataType != null) {
			this.specificData = DataFactory.create(
				CampaignSetting[this.campaign.settings] + DataType[this.dataType] as SingleDataKey<any>,
				this.current,
				this.campaign,
				'',
			);
		}

		if (this.dataType === DataType.Session) {
			(<SessionDataInterface>this.specificData).adventure = this.io.getAdventure((<SessionDataInterface>this.specificData).adventureId);
		} else if (this.dataType === DataType.Scene) {
			(<SceneDataInterface>this.specificData).adventure = this.io.getAdventure(
				(<SceneDataInterface>this.specificData).adventureId,
			);
			(<SceneDataInterface>this.specificData).session = this.io.getSession(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
			);
			(<SceneDataInterface>this.specificData).previousScene = this.io.getScene(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
				(<SceneDataInterface>this.specificData).id - 1,
			);
			(<SceneDataInterface>this.specificData).nextScene = this.io.getScene(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
				(<SceneDataInterface>this.specificData).id + 1,
			);
		}
	}

	abstract generateData(
	): ResponseDataInterface;
}
