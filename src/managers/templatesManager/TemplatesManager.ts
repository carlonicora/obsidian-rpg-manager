import {TemplatesManagerInterface} from "./interfaces/TemplatesManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
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
		campaignSettings: CampaignSetting,
		type: ComponentType,
		templateName: string,
		name: string,
		campaignId?: number,
		adventureId?: number,
		actId?: number,
		sceneId?: number,
		sessionId?: number,
		additionalInformation?: any,
	): TemplateInterface {
		let templateClass = this._templates.get(this._getIdentifier(type, campaignSettings));

		if (templateClass !== undefined)
			return this._initialiseTemplate(
				templateClass,
				campaignSettings,
				type,
				templateName,
				name,
				campaignId,
				adventureId,
				actId,
				sceneId,
				sessionId,
				additionalInformation,
			);

		//TODO: Change empty error
		if (campaignSettings === CampaignSetting.Agnostic)
			throw new Error('');

		templateClass = this._templates.get(this._getIdentifier(type, CampaignSetting.Agnostic));

		//TODO: Change empty error
		if (templateClass === undefined)
			throw new Error('');

		return this._initialiseTemplate(
			templateClass,
			campaignSettings,
			type,
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
		campaignSettings: CampaignSetting,
		type: ComponentType,
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
		campaignSettings: CampaignSetting,
		type: ComponentType,
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
