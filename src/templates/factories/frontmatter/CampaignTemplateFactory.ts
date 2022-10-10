import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CampaignMetadataInterface} from "../../../metadatas/components/CampaignMetadataInterface";

export class CampaignTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.campaignTag +'/' + this.campaignId);
		frontmatter.settings = "Agnostic";
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: CampaignMetadataInterface = {
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
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
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

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
