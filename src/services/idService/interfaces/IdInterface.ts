import {ComponentType} from "../../../core/enums/ComponentType";
import {IdTagValueInterface} from "./IdTagValueInterface";
import {IdTagStatus} from "../enums/IdTagStatus";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IdInterface {
	type: ComponentType;
	tagMap: Map<ComponentType, IdTagValueInterface>;
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
	): Map<ComponentType, IdTagStatus>|undefined;

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
