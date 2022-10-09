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
						relationship: 'univocal',
					},
					pcs: {
						relationship: 'univocal',
					},
					npcs: {
						relationship: 'univocal',
					},
					factions: {
						relationship: 'univocal',
					},
					clues: {
						relationship: 'univocal',
					},
					locations: {
						relationship: 'univocal',
					},
					events: {
						relationship: 'univocal',
					},
				}
			}
		}

		return this.generateRpgManagerCodeBlock(metadata);
	}
}

