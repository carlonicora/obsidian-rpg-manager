import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TemplateInterface} from "./TemplateInterface";

export interface TemplateClassInterface<T extends TemplateInterface> {
	new(
		api: RpgManagerApiInterface,
		templateName: string,
		name: string,
		campaignId?: number,
		adventureId?: number,
		actId?: number,
		sceneId?: number,
		sessionId?: number,
		additionalInformation?: any,
	): T;
}
