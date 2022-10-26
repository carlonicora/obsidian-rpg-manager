import {ModelsManagerInterface} from "./interfaces/ModelsManagerInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {App, TFile} from "obsidian";
import {ModelClassInterface} from "./interfaces/ModelClassInterface";
import {ModelInterface} from "./interfaces/ModelInterface";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";

export class ModelsManager implements ModelsManagerInterface {
	private _models: Map<string, ModelClassInterface<ModelInterface>>
		= new Map<string, ModelClassInterface<ModelInterface>>();

	constructor(
		private _app: App,
		private _api: RpgManagerApiInterface,
	) {
	}

	public get(
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface|undefined {
		let modelClass = this._models.get(this._getIdentifier(id.type, campaignSettings));

		if (modelClass !== undefined)
			return this._initialiseComponentModel(modelClass, id, campaignSettings, file);

		if (campaignSettings === CampaignSetting.Agnostic)
			return undefined

		modelClass = this._models.get(this._getIdentifier(id.type, CampaignSetting.Agnostic));

		if (modelClass === undefined)
			return undefined

		return this._initialiseComponentModel(modelClass, id, campaignSettings, file);;
	}

	public register<T extends ModelInterface>(
		model: ModelClassInterface<T>,
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
		modelClass: ModelClassInterface<ModelInterface>,
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ModelInterface {
		const response = new modelClass(this._app, this._api);
		response.initialise(campaignSettings, id, file);

		return response;
	}

}
