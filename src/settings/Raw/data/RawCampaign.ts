import {Campaign} from "../../../data/Campaign";
import {RawCampaignInterface} from "../interfaces/RawCampaignInterface";
import {CachedMetadata, TFile} from "obsidian";

export class RawCampaign extends Campaign implements RawCampaignInterface {
	public apiCampaignKey: string|null;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.apiCampaignKey = this.frontmatter?.apiCampaignKey ?? null;
	}
}
