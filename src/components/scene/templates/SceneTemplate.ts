import {ControllerMetadataInterface} from "../../../managers/controllerManager/interfaces/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../interfaces/SceneMetadataInterface";
import {ActDataInterface} from "../../act/interfaces/ActDataInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignSetting} from "../../campaign/enums/CampaignSetting";
import {
	AbstractComponentTemplate
} from "../../../managers/templatesManager/abstracts/AbstractComponentTemplate";
import {SceneDataMetadataInterface} from "../interfaces/SceneDataMetadataInterface";

export class SceneTemplate extends AbstractComponentTemplate {
	protected data: SceneDataMetadataInterface|undefined;

	protected generateDataCodeBlock(
	): string {
		const synopsis = '';
		let sceneType = '';
		let isActedUpon = false;
		let storyCircleStage = '';

		if (this.additionalInformation !== undefined){
			if (this.data?.sceneType !== undefined)
				sceneType = this.data.sceneType;

			if (this.data?.isActedUpon !== undefined)
				isActedUpon = this.data.isActedUpon;

			if (this.data?.storyCircleStage !== undefined)
				storyCircleStage = this.data.storyCircleStage;
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
				storyCircleStage: storyCircleStage,
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
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateID(
	): string {
		return ComponentType.Scene + '-' + CampaignSetting.Agnostic + '-' + this.campaignId + '/' + this.adventureId + '/' + this.actId + '/' + this.sceneId;
	}
}

