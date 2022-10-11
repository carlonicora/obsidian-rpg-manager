import {ComponentType} from "../../components/enums/ComponentType";
import {TagValueInterface} from "./TagValueInterface";
import {TagStatus} from "../enums/TagStatus";
import {CampaignSetting} from "../../components/components/campaign/enums/CampaignSetting";

export interface IdInterface {
	type: ComponentType;
	tagMap: Map<ComponentType, TagValueInterface>;
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
	): Map<ComponentType, TagStatus>|undefined;

	get possiblyNotFoundIds(
	): Map<ComponentType, number>|undefined;

	getTypeValue(
		type: ComponentType,
	): number|undefined;

	get stringID(): string;
}
