import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {CampaignMetadataInterface} from "../../database/interfaces/metadata/components/CampaignMetadataInterface";

export class CampaignFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.campaignTag +'/' + this.campaignId);
		frontmatter.settings = "Agnostic";
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|CampaignMetadataInterface = {
			models: {
				header: true
			},
			plot: {
				abt: {
					need: '',
					and: '',
					but: '',
					therefore: '',
				},
				storycircle: {
					you: '',
					need: '',
					go: '',
					search: '',
					find: '',
					take: '',
					return: '',
					change: '',
				}
			},
			data: {
				date: '',
				synopsis: '',
				image: '',
				complete: false,
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
