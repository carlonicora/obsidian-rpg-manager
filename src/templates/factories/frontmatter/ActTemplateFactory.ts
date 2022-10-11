import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {ActMetadataInterface} from "../../../metadatas/components/ActMetadataInterface";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";
import {ComponentType} from "../../../databases/enums/ComponentType";

export class ActTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: ActMetadataInterface = {
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
				synopsis: '',
				image: '',
				complete: false,
				abtStage: ''
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
					scenes: {
						relationship: 'hierarchy'
					},
					pcs: {
						relationship: 'unidirectional'
					},
					npcs: {
						relationship: 'unidirectional'
					},
					clues: {
						relationship: 'unidirectional'
					},
					locations: {
						relationship: 'unidirectional'
					},
					factions: {
						relationship: 'unidirectional'
					}
				}
			}
		}
		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Act + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.adventureId + '/' + this.actId;
	}
}
