import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {ActMetadataInterface} from "../interfaces/ActMetadataInterface";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {ComponentType} from "../../../core/enums/ComponentType";
import {
	AbstractComponentTemplate
} from "../../../api/templatesManager/abstracts/AbstractComponentTemplate";

export class ActTemplate extends AbstractComponentTemplate {
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
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Act + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.adventureId + '/' + this.actId;
	}
}
