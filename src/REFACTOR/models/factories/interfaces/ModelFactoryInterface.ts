import {CampaignSetting} from "../../../../components/campaign/enums/CampaignSetting";
import {OldModelInterface} from "../../interfaces/OldModelInterface";
import {ModelInterface} from "../../../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../../core/enums/ComponentType";

export interface ModelFactoryInterface {
	create(
		settings: CampaignSetting,
		modelName: string,
		currentComponent: ModelInterface,
		source: string,
		sourcePath: string,
		sourceMeta: any,
	): OldModelInterface;

	createSubModel(
		settings: CampaignSetting|undefined,
		type: ComponentType|undefined,
		subModelName: string,
	): any;
}
