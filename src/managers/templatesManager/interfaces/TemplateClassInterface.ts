import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TemplateInterface} from "./TemplateInterface";

export interface TemplateClassInterface<T extends TemplateInterface> {
	new(
		api: RpgManagerApiInterface,
		templateName: string,
		name: string,
		id: string,
		campaignId: string,
		parentId: string,
		positionInParent?: number,
		additionalInformation?: any,
	): T;
}
