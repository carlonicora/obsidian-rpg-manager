import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";

export class ActTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		super.addFrontmatterData(frontmatter);
		frontmatter.tags.push(this.settings.actTag + '/' + this.campaignId + '/' + this.adventureId + '/' + this.actId);

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
			'actNavigation',
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
			'act',
		);
	}
}
