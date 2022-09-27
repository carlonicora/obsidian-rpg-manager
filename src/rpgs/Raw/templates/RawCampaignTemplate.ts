import {CampaignFrontmatterTemplateFactory} from "../../../factories/templates/frontmatter/CampaignFrontmatterTemplateFactory";

export class RawCampaignTemplate extends CampaignFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return undefined;
	}

	public generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}
}
