import {Campaign} from "../../../data/Campaign";
import {RawCampaignInterface} from "../interfaces/RawCampaignInterface";
import {FrontMatterCache} from "obsidian";

export class RawCampaign extends Campaign implements RawCampaignInterface {
	public apiCampaignKey: string|null;

	protected async initialiseData(
		frontmatter: FrontMatterCache|undefined,
	) {
		this.apiCampaignKey = frontmatter?.apiCampaignKey ?? null;

		super.initialiseData(frontmatter);
	}
}
