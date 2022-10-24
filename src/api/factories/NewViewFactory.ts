import {NewViewFactoryInterface} from "./interfaces/NewViewFactoryInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewClassInterface} from "./interfaces/NewViewClassInterface";
import {App} from "obsidian";
import {ComponentType} from "../../core/enums/ComponentType";

export class NewViewFactory implements NewViewFactoryInterface {
	private _factories: Map<{viewType: NewViewType, componentType: ComponentType, campaignSettings: CampaignSetting}, NewViewClassInterface<NewViewInterface>>
		= new Map<{viewType: NewViewType, componentType: ComponentType, campaignSettings: CampaignSetting}, NewViewClassInterface<NewViewInterface>>();

	constructor(
		private _app: App,
	) {
	}

	create(
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): NewViewClassInterface<NewViewInterface> {
		let response = this._factories.get({viewType: viewType, componentType: componentType, campaignSettings: campaignSettings});

		if (response !== undefined)
			return response;

		//TODO replace empty error
		if (campaignSettings === CampaignSetting.Agnostic)
			throw new Error('');

		response = this._factories.get({viewType: viewType, componentType: componentType, campaignSettings: CampaignSetting.Agnostic});

		//TODO replace empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	register<T extends NewViewInterface>(
		view: NewViewClassInterface<T>,
		viewType: NewViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting
	): void {
		this._factories.set({viewType: viewType, componentType: componentType, campaignSettings: campaignSettings}, view);
	}
}
