import {CampaignSetting} from "../../../../components/campaign/enums/CampaignSetting";
import {ModelInterface} from "../../interfaces/ModelInterface";
import {ComponentModelInterface} from "../../../../api/componentManager/interfaces/ComponentModelInterface";
import {ComponentType} from "../../../../core/enums/ComponentType";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentComponent: ComponentModelInterface,
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
