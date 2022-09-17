import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../helpers/RpgCodeBlock";

export class SceneTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.sceneTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId + '/' + this.sceneId);
		frontmatter.relationships = {
			clues: {},
			characters: {},
			locations: {},
			musics: {},
		};
		frontmatter.times = {
			start: {},
			end: {},
		}
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
			'sceneNavigation',
			{
				trigger: "",
				action: "",
			},
		);
	}

	public generateLastCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
			'scene',
		);
	}
}

