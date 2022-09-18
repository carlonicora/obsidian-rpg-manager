import {AbstractTemplateFactory} from "../../abstracts/AbstractTemplateFactory";
import {RpgCodeBlockInterface} from "../../interfaces/RpgCodeBlockInterface";

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
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
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
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'session',
		);
	}
}
