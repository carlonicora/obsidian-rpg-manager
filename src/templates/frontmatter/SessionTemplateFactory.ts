import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class SessionTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.sessionTag + '/' + this.campaignId + '/' + this.sessionId);

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
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock('sessionNavigation');
	}

	public generateLastCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'session',
		);
	}
}
