import {CampaignSetting} from "../../enums/CampaignSetting";
import {RecordInterface} from "../database/RecordInterface";
import {ModelInterface} from "../ModelInterface";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: RecordInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface;
}
