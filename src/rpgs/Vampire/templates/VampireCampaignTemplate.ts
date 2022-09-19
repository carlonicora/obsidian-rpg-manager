import {CampaignTemplateFactory} from "../../../factories/templates/CampaignTemplateFactory";

export class VampireCampaignTemplate extends CampaignTemplateFactory {
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

/*
protected generateFrontmatterAdditionalInformation(
): string {
	return 'rpgs: Vampire\n';
}

 */
}
