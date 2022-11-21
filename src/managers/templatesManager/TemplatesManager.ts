import {TemplatesManagerInterface} from "./interfaces/TemplatesManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {TemplateInterface} from "./interfaces/TemplateInterface";
import {TemplateClassInterface} from "./interfaces/TemplateClassInterface";
import {LoggerService} from "../../services/loggerService/LoggerService";
import {LogMessageType} from "../../services/loggerService/enums/LogMessageType";
import {ControllerMetadataDataInterface} from "../controllerManager/interfaces/ControllerMetadataDataInterface";

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
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		additionalInformation?: ControllerMetadataDataInterface,
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
				positionInParent,
				additionalInformation,
			);

		if (campaignSettings === CampaignSetting.Agnostic) {
			this._api.service(LoggerService).createError(LogMessageType.System, 'The requested element (' + ComponentType[type] + ') does not have a creation template');
			throw new Error('The requested element (' + ComponentType[type] + ') does not have a creation template');
		}


		templateClass = this._templates.get(this._getIdentifier(type, CampaignSetting.Agnostic));

		if (templateClass === undefined) {
			this._api.service(LoggerService).createError(LogMessageType.System, 'The requested element (' + ComponentType[type] + ') does not have a creation template');
			throw new Error('The requested element (' + ComponentType[type] + ') does not have a creation template');
		}

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
			positionInParent,
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
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		additionalInformation?: ControllerMetadataDataInterface,
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
			positionInParent,
			additionalInformation,
		);

		return response;
	}
}
