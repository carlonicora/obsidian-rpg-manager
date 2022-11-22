import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./IndexTagValueInterface";
import {IndexTagStatus} from "../enums/IndexTagStatus";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexInterface {
	type: ComponentType;
	tagMap: Map<ComponentType, IndexTagValueInterface>;
	campaignSettings: CampaignSetting;
	positionInParent: number;

	get id(
	):string;

	set id(
		id: string,
	);

	get campaignId(
	): string;

	get adventureId(
	): string|undefined;

	get actId(
	): string|undefined;

	get sceneId(
	): string|undefined;

	get sessionId(
	): string|undefined;

	get isValid(
	): boolean;

	isTypeValid(
		type: ComponentType,
	): boolean;

	get invalidIds(
	): Map<ComponentType, IndexTagStatus>|undefined;

	get possiblyNotFoundIds(
	): Map<ComponentType, string>|undefined;

	getTypeValue(
		type: ComponentType,
	): string|undefined;

	replaceId(
		type: ComponentType,
		id: string,
	): void;
}
