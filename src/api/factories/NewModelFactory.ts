import {NewModelFactoryInterface} from "./interfaces/NewModelFactoryInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {App, TFile} from "obsidian";
import {NewModelClassInterface} from "./interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../componentManager/interfaces/ComponentModelInterface";
import {IdInterface} from "../../services/id/interfaces/IdInterface";

export class NewModelFactory implements NewModelFactoryInterface {
	private _models: Map<string, NewModelClassInterface<ComponentModelInterface>>
		= new Map<string, NewModelClassInterface<ComponentModelInterface>>();

	constructor(
		private _app: App,
	) {
	}

	public create(
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ComponentModelInterface|undefined {
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

	public register<T extends ComponentModelInterface>(
		model: NewModelClassInterface<T>,
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
		modelClass: NewModelClassInterface<ComponentModelInterface>,
		id: IdInterface,
		campaignSettings: CampaignSetting,
		file: TFile,
	): ComponentModelInterface {
		const response = new modelClass(this._app);
		response.initialise(campaignSettings, id, file);

		return response;
	}

}
