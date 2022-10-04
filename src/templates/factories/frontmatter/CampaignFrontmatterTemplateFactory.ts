import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CampaignMetadataInterface} from "../../../metadatas/components/CampaignMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";

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
				currentAdventureId: '',
				currentActId: '',
				currentSessionId: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|ActDataInterface = {
			models: {
				lists: {
					pcs: {
						relationship: 'hierarchy'
					},
					subplots: {
						relationship: 'hierarchy'
					},
					adventures: {
						relationship: 'hierarchy'
					},
					acts: {
						relationship: 'hierarchy'
					},
					sessions: {
						relationship: 'hierarchy'
					},
					events: {
						relationship: 'hierarchy'
					},
					npcs: {
						relationship: 'hierarchy'
					}
				}
			}
		}
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
