import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../../../metadatas/components/SceneMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";

export class SceneFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.actId + '/' + this.sceneId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|SceneMetadataInterface = {
			models: {
				header: true
			},
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
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|ActDataInterface = {
			models: {
				lists: {
					musics: {},
					pcs: {},
					npcs: {},
					factions: {},
					clues: {},
					locations: {},
					events: {},
				}
			}
		}
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}

