import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../../../metadatas/components/SceneMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {CampaignSetting} from "../../../databases/enums/CampaignSetting";

export class SceneTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		const metadata: SceneMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				complete: false,
				sessionId: 0,
				action: '',
				trigger: '',
				date: '',
				sceneType: '',
				isActedUpon: false,
				duration: 0,
				durations: [],
				storyCircleStage: ''
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
		const metadata: ControllerMetadataInterface|ActDataInterface = {
			models: {
				lists: {
					musics: {
						relationship: 'unidirectional',
					},
					pcs: {
						relationship: 'unidirectional',
					},
					npcs: {
						relationship: 'unidirectional',
					},
					factions: {
						relationship: 'unidirectional',
					},
					clues: {
						relationship: 'unidirectional',
					},
					locations: {
						relationship: 'unidirectional',
					},
					events: {
						relationship: 'unidirectional',
					},
				}
			}
		}

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Scene + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.adventureId + '/' + this.actId + '/' + this.sceneId;
	}
}

