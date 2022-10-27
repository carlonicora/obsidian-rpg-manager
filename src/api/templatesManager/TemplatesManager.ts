import {TemplatesManagerInterface} from "./interfaces/TemplatesManagerInterface";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TemplateInterface} from "./interfaces/TemplateInterface";
import {TemplateClassInterface} from "./interfaces/TemplateClassInterface";

export class TemplatesManager implements TemplatesManagerInterface {
	private _templates: Map<string, TemplateClassInterface<TemplateInterface>> = new Map<string, TemplateClassInterface<TemplateInterface>>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get(
		type: ComponentType,
		campaignSettings: CampaignSetting,
		templateName: string,
		name: string,
		campaignId?: number,
		adventureId?: number,
		actId?: number,
		sceneId?: number,
		sessionId?: number,
		additionalInformation?: any,
	): TemplateInterface|undefined {
		let templateClass = this._templates.get(this._getIdentifier(type, campaignSettings));

		if (templateClass !== undefined)
			return this._initialiseTemplate(
				templateClass,
				type,
				campaignSettings,
				templateName,
				name,
				campaignId,
				adventureId,
				actId,
				sceneId,
				sessionId,
				additionalInformation,
			);

		if (campaignSettings === CampaignSetting.Agnostic)
			return undefined;

		templateClass = this._templates.get(this._getIdentifier(type, CampaignSetting.Agnostic));

		if (templateClass === undefined)
			return undefined;

		return this._initialiseTemplate(
			templateClass,
			type,
			campaignSettings,
			templateName,
			name,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
			additionalInformation,
		);
	}

	public register<T extends TemplateInterface>(
		templateClass: TemplateClassInterface<T>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): void {
		this._templates.set(this._getIdentifier(type, campaignSettings), templateClass);
	}

	private _getIdentifier(
		type: ComponentType,
		campaignSettings: CampaignSetting,
	): string {
		return type.toString() + '-' + campaignSettings.toString();
	}

	private _initialiseTemplate(
		templateClass: TemplateClassInterface<TemplateInterface>,
		type: ComponentType,
		campaignSettings: CampaignSetting,
		templateName: string,
		name: string,
		campaignId?: number,
		adventureId?: number,
		actId?: number,
		sceneId?: number,
		sessionId?: number,
		additionalInformation?: any,
	): TemplateInterface {
		const response = new templateClass(
			this._api,
			templateName,
			name,
			campaignId,
			adventureId,
			actId,
			sceneId,
			sessionId,
			additionalInformation,
		);

		return response;
	}
}
