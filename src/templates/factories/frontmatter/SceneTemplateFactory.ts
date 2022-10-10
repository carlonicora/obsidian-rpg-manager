import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../../../metadatas/components/SceneMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";

export class SceneTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.actId + '/' + this.sceneId);
	}

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
}

