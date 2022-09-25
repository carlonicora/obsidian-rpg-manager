import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class SessionTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.sessionTag + '/' + this.campaignId + '/' + this.sessionId);

		frontmatter.synopsis = (this?.additionalInformation?.synopsis === undefined ? '' : this.additionalInformation.synopsis.replaceAll('"', '\\"'));

		frontmatter.dates = {
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
