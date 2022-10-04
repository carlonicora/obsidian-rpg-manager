import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {ClueMetadataInterface} from "../../../metadatas/components/ClueMetadataInterface";

export class ClueFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.clueTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|ClueMetadataInterface = {
			models: {
				header: true,
				lists: {
					subplots: {
						relationship: "reversed",
					},
					pcs: {},
					npcs: {},
					locations: {},
					clues: {},
					events: {},
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false,
				found: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
