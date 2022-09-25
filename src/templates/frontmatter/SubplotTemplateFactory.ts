import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class SubplotTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.subplotTag + '/' + this.campaignId);

		let synopsis: string|undefined = this?.additionalInformation?.synopsis;

		if (synopsis === undefined) {
			synopsis = '';
		} else {
			synopsis = synopsis.replaceAll('"', '\\"');
		}

		frontmatter.synopsis = synopsis;
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return this.generateRpgManagerCodeBlock(
			'subplot',
		{
				abt: {
					need: "",
						and: "",
						but: "",
						therefore: "",
				},
			}
		);
	}
}
