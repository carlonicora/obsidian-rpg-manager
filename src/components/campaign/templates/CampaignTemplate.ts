import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {CampaignMetadataInterface} from "../interfaces/CampaignMetadataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";

export class CampaignTemplate extends AbstractComponentTemplate {
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
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): IndexDataInterface {
		return {
			type: ComponentType.Campaign,
			campaignSettings: CampaignSetting.Agnostic,
			id: this.campaignId,
			campaignId: this.campaignId,
			positionInParent: 0,
		};
	}
}
