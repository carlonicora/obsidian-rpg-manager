import {CampaignTemplateFactory} from "../../../factories/templates/CampaignTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";

export class RawCampaignTemplate extends CampaignTemplateFactory {
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
	return 'rpgs: Raw\n' +
		'apiCampaignKey: \n';
}

 */
}
