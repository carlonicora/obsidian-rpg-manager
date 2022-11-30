import {ModelsManagerInterface} from "./interfaces/ModelsManagerInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TFile} from "obsidian";
import {ModelInterface} from "./interfaces/ModelInterface";
import {IndexInterface} from "../../services/indexService/interfaces/IndexInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";

export class ModelsManager implements ModelsManagerInterface {
	private _models: Map<string, ClassInterface<ModelInterface>>
		= new Map<string, ClassInterface<ModelInterface>>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get(
		id: IndexInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface|undefined {
		let modelClass = this._models.get(this._getIdentifier(id.type, campaignSettings));

		if (modelClass !== undefined)
			return this._initialiseComponentModel(modelClass, id, campaignSettings, file);

		if (campaignSettings === CampaignSetting.Agnostic)
			return undefined;

		modelClass = this._models.get(this._getIdentifier(id.type, CampaignSetting.Agnostic));

		if (modelClass === undefined)
			return undefined;

		return this._initialiseComponentModel(modelClass, id, campaignSettings, file);
	}

	public register<T extends ModelInterface>(
		model: ClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void {
		this._models.set(this._getIdentifier(type, campaignSettings), model);
	}

	private _getIdentifier(
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): string {
		return type.toString() + '-' + campaignSettings.toString();
	}

	private _initialiseComponentModel(
		modelClass: ClassInterface<ModelInterface>,
		id: IndexInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface {
		const response = new modelClass(this._api);
		response.initialise(campaignSettings, id, file);

		return response;
	}
}
