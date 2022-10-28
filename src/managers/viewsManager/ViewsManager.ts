import {ViewsManagerInterface} from "./interfaces/ViewsManagerInterface";
import {ViewType} from "./enum/ViewType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ViewClassInterface} from "./interfaces/ViewClassInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ElementInterface} from "./interfaces/ElementInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";

export class ViewsManager implements ViewsManagerInterface {
	private _factories: Map<string, ViewClassInterface>
		= new Map<string, ViewClassInterface>();

	private _elements: Map<ClassInterface<ElementInterface>, ElementInterface>
		= new Map<ClassInterface<ElementInterface>, ElementInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	create(
		viewType: ViewType,
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

	public getElement<T extends ElementInterface>(
		elementClass: ClassInterface<T>,
	): ElementInterface {
		let response: ElementInterface | undefined = this._elements.get(elementClass);

		if (response === undefined) {
			response = new elementClass(this._api);
			this._elements.set(elementClass, response);
		}

		return response;
	}

	public async register(
		view: ViewClassInterface,
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting
	): Promise<void> {
		this._factories.set(this._getIdentifier(viewType, componentType, campaignSettings), view);
	}

	public async registerElement<T extends ElementInterface>(
		elementClass: ClassInterface<T>,
	): Promise<void> {
		this._elements.set(elementClass, new elementClass(this._api));
	}

	private _getIdentifier(
		viewType: ViewType,
		componentType: ComponentType,
		campaignSettings: CampaignSetting,
	): string {
		return viewType.toString() + '-' + componentType.toString() + '-' + campaignSettings.toString();
	}
}
