import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {AdventureMetadataInterface} from "../../database/interfaces/metadata/components/AdventureMetadataInterface";

export class AdventureFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.adventureTag + '/' + this.campaignId + '/' + this.adventureId);
	}

	public generateInitialCodeBlock(
	): string|undefined {

		const metadata: ControllerMetadataInterface|AdventureMetadataInterface = {
			models: {
				header: true
			},
			plot: {
				abt: {
					need: '',
					and: '',
					but: '',
					therefore: '',
				},
				storycircle: {
					you: '',
					need: '',
					go: '',
					search: '',
					find: '',
					take: '',
					return: '',
					change: '',
				}
			},
			data: {
				synopsis: '',
				complete: false,
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
