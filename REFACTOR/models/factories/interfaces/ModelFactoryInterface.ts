import {CampaignSetting} from "../../../../src/components/campaign/enums/CampaignSetting";
import {OldModelInterface} from "../../interfaces/OldModelInterface";
import {ModelInterface} from "../../../../src/api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../../src/core/enums/ComponentType";

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
