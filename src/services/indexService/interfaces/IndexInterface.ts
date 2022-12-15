import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./IndexTagValueInterface";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";

export interface IndexInterface {
	type: ComponentType;
	tagMap: Map<ComponentType, IndexTagValueInterface>;
	campaignSettings: CampaignSetting;
	positionInParent: number;

	get id(
	):string;

	get campaignId(
	): string;

	get parentId(
	): string;

	get parentPosition(
	): number;

	get checksum(
	): string|Int32Array|undefined;
}
