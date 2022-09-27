import {CampaignSetting} from "../../enums/CampaignSetting";
import {ComponentInterface} from "../database/ComponentInterface";
import {ModelInterface} from "../ModelInterface";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: ComponentInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface;
}
