import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";

export class CampaignFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.campaignTag +'/' + this.campaignId);
		frontmatter.settings = "Agnostic";
		frontmatter.dates = {
			current: {},
		};
		if (this.additionalInformation != null && this.additionalInformation.current != null && this.additionalInformation.current != ''){
			frontmatter.dates.current = this?.additionalInformation?.current;
		}
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'campaignNavigation',
			{
				abt: {
					need: "",
					and: "",
					but: "",
					therefore: "",
				}
			}
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('campaign');
	}
}
