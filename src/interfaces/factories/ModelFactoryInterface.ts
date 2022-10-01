import {CampaignSetting} from "../../enums/CampaignSetting";
import {ModelInterface} from "../ModelInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: ComponentV2Interface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface;
}
