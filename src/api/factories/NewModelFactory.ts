import {NewModelFactoryInterface} from "./interfaces/NewModelFactoryInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {App} from "obsidian";
import {NewModelClassInterface} from "./interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "../componentManager/interfaces/ComponentModelInterface";

export class NewModelFactory implements NewModelFactoryInterface {
	private _models: Map<{type: ComponentType, campaignSettings: CampaignSetting}, ComponentModelInterface>
		= new Map<{type: ComponentType; campaignSettings: CampaignSetting}, ComponentModelInterface>();

	constructor(
		private _app: App,
	) {
	}

	public create(
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): ComponentModelInterface {
		let response = this._models.get({type: type, campaignSettings: campaignSettings});

		if (response !== undefined)
			return response;

		//TODO replace empty error
		if (campaignSettings === CampaignSetting.Agnostic)
			throw new Error('');

		response = this._models.get({type: type, campaignSettings: CampaignSetting.Agnostic});

		//TODO replace empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	public register<T extends ComponentModelInterface>(
		model: NewModelClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void {
		this._models.set({type: type, campaignSettings: campaignSettings}, new model(this._app));
	}


}
