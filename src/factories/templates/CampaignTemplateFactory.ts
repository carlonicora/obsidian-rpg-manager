import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../helpers/RpgCodeBlock";

export class CampaignTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.campaignTag +'/' + this.campaignId);
		frontmatter.synopsis = "";
		frontmatter.settings = "Agnostic";
		frontmatter.dates = {
			current: {}
		};
		if (this.additionalInformation != null && this.additionalInformation.current != null){
			frontmatter.dates.current = this.additionalInformation.current;
		}
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
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
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock('campaign');
	}
}
