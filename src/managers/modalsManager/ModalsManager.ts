import {ComponentType} from "../../core/enums/ComponentType";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ModalsManagerInterface} from "./interfaces/ModalsManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartClassInterface} from "./interfaces/ModalPartClassInterface";
import {LoggerService} from "../../services/loggerService/LoggerService";
import {LogMessageType} from "../../services/loggerService/enums/LogMessageType";

export class ModalsManager implements ModalsManagerInterface {
	private _modals: Map<string,ClassInterface<ModalInterface>> = new Map<string, ClassInterface<ModalInterface>>();
	private _modalParts: Map<string,ClassInterface<ModalPartInterface>> = new Map<string, ClassInterface<ModalPartInterface>>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public getPartial(
		campaignSettings: CampaignSetting,
		type: ComponentType,
		modal: ModalInterface,
	): ModalPartInterface {
		let modalPartClass = this._modalParts.get(this._getIdentifier(campaignSettings, type));

		if (modalPartClass !== undefined)
			return this._initialiseComponentModalPart(modalPartClass, modal);

		if (campaignSettings === CampaignSetting.Agnostic) {
			this._api.service(LoggerService).createError(LogMessageType.System, 'The requested element (' + ComponentType[type] + ') does not have a creation modal');
			throw new Error('The requested element (' + ComponentType[type] + ') does not have a creation modal');
		}

		modalPartClass = this._modalParts.get(this._getIdentifier(CampaignSetting.Agnostic, type));

		if (modalPartClass === undefined) {
			this._api.service(LoggerService).createError(LogMessageType.System, 'The requested element (' + ComponentType[type] + ') does not have a creation modal');
			throw new Error('The requested element (' + ComponentType[type] + ') does not have a creation modal');
		}

		return this._initialiseComponentModalPart(modalPartClass, modal);
	}

	public registerPartial<T extends ModalPartInterface>(
		modalPart: ClassInterface<T>,
		campaignSettings: CampaignSetting,
		type: ComponentType,
	): void {
		this._modalParts.set(this._getIdentifier(campaignSettings, type), modalPart);
	}

	private _getIdentifier(
		campaignSettings: CampaignSetting,
		type: ComponentType,
	): string {
		return campaignSettings.toString() + '-' + type.toString();
	}

	private _initialiseComponentModal(
		modalClass: ClassInterface<ModalInterface>,
	): ModalInterface {
		const response = new modalClass(this._api);

		return response;
	}

	private _initialiseComponentModalPart(
		modalClass: ModalPartClassInterface<ModalPartInterface>,
		modal: ModalInterface,
	): ModalPartInterface {
		const response = new modalClass(this._api, modal);

		return response;
	}
}
