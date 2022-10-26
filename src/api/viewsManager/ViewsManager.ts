import {ViewsManagerInterface} from "./interfaces/ViewsManagerInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "./interfaces/ViewClassInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";

export class ViewsManager implements ViewsManagerInterface {
	private _factories: Map<string, ViewClassInterface>
		= new Map<string, ViewClassInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	create(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): ViewClassInterface|undefined {
		let response = this._factories.get(this._getIdentifier(viewType, componentType, campaignSettings));

		if (response !== undefined)
			return response;

		if (campaignSettings === CampaignSetting.Agnostic)
			return undefined;

		response = this._factories.get(this._getIdentifier(viewType, componentType, CampaignSetting.Agnostic));

		if (response === undefined)
			return undefined;

		return response;
	}

	register(
		view: ViewClassInterface,
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting
	): void {
		this._factories.set(this._getIdentifier(viewType, componentType, campaignSettings), view);
	}

	private _getIdentifier(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): string {
		return viewType.toString() + '-' + componentType.toString() + '-' + campaignSettings.toString();
	}
}
