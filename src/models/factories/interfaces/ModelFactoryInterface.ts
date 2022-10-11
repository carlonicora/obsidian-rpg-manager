import {CampaignSetting} from "../../../components/components/campaign/enums/CampaignSetting";
import {ModelInterface} from "../../interfaces/ModelInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {ComponentType} from "../../../components/enums/ComponentType";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentComponent: ComponentInterface,
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
