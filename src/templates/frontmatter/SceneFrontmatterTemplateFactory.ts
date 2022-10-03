import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {SceneMetadataInterface} from "../../database/interfaces/metadata/components/SceneMetadataInterface";

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
}

