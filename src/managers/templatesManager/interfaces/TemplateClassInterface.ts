import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TemplateInterface} from "./TemplateInterface";

export interface TemplateClassInterface<T extends TemplateInterface> {
	new(
		api: RpgManagerApiInterface,
		templateName: string,
		name: string,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		positionInParent?: number,
		additionalInformation?: any,
	): T;
}
