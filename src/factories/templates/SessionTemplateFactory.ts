import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";
import {RpgCodeBlock} from "../../helpers/RpgCodeBlock";

export class SessionTemplateFactory extends AbstractTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.app.plugins.getPlugin('rpg-manager').settings.sessionTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.sessionId);

		let synopsis: string|undefined = this?.additionalInformation?.synopsis;

		if (synopsis === undefined) {
			synopsis = '';
		} else {
			synopsis = synopsis.replaceAll('"', '\\"');
		}

		frontmatter.synopsis = synopsis;
		frontmatter.dates = {
			session: {},
			irl: {},
		}
		frontmatter.relationships = {
			musics: {},
		};
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
			'sessionNavigation',
			{
				abt: {
					need: "",
					and: "",
					but: "",
					therefore: "",
				},
				storycircle: {
					you: "",
					need: "",
					go: "",
					search: "",
					find: "",
					take: "",
					return: "",
					change: "",
				}
			}
		);
	}

	public generateLastCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return new RpgCodeBlock(
			'session',
		);
	}
}
