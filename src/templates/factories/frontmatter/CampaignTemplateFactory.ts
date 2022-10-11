import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CampaignMetadataInterface} from "../../../metadatas/components/CampaignMetadataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

export class CampaignTemplateFactory extends AbstractComponentTemplateFactory {
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

	public generateID(
	): string {
		return ComponentType.Campaign + '-' + CampaignSetting.Agnostic + '-' + this.campaignId;
	}
}
