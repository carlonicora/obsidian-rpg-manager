import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./IndexTagValueInterface";
import {IndexTagStatus} from "../enums/IndexTagStatus";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexInterface {
	type: ComponentType;
	tagMap: Map<ComponentType, IndexTagValueInterface>;
	campaignSettings: CampaignSetting;

	get id(
	):number;

	set id(
		id: number,
	);

	get tag(
	): string;

	get campaignId(
	): number;

	get adventureId(
	): number|undefined;

	get actId(
	): number|undefined;

	get sceneId(
	): number|undefined;

	get sessionId(
	): number|undefined;

	get isValid(
	): boolean;

	get stringValue(
	): string;

	isTypeValid(
		type: ComponentType,
	): boolean;

	get invalidIds(
	): Map<ComponentType, IndexTagStatus>|undefined;

	get possiblyNotFoundIds(
	): Map<ComponentType, number>|undefined;

	getTypeValue(
		type: ComponentType,
	): number|undefined;

	replaceId(
		type: ComponentType,
		id: number,
	): void;

	get stringID(): string;
}
