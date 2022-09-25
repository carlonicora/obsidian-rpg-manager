import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class SubplotTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.subplotTag + '/' + this.campaignId);

		frontmatter.synopsis = (this?.additionalInformation?.synopsis === undefined ? '' : this.additionalInformation.synopsis.replaceAll('"', '\\"'));
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
