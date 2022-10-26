import {AbstractComponentTemplateFactory} from "../../../core/abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {ActDataInterface} from "../../act/interfaces/ActDataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";

export class SceneTemplateFactory extends AbstractComponentTemplateFactory {
	protected generateDataCodeBlock(
	): string {
		let synopsis = '';
		let sceneType = '';
		let isActedUpon = false;

		if (this.additionalInformation !== undefined){
			if (this.additionalInformation?.synopsis !== undefined)
				synopsis = this.additionalInformation.synopsis;

			if (this.additionalInformation?.sceneType !== undefined)
				sceneType = this.additionalInformation.sceneType;

			if (this.additionalInformation?.isActedUpon !== undefined)
				isActedUpon = this.additionalInformation.isActedUpon;
		}

		const metadata: SceneMetadataInterface = {
			data: {
				synopsis: synopsis,
				complete: false,
				sessionId: 0,
				action: '',
				trigger: '',
				date: '',
				sceneType: sceneType,
				isActedUpon: isActedUpon,
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

