import {CampaignSetting} from "../../enums/CampaignSetting";
import {ModelInterface} from "../ModelInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";
import {ComponentType} from "../../enums/ComponentType";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentElement: ComponentInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): ModelInterface;

	createSubModel(
		settings: CampaignSetting|undefined,
		type: ComponentType|undefined,
		subModelName: string,
	): any;
}
