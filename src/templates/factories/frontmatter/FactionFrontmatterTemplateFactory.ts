import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/ControllerMetadataInterface";
import {FactionMetadataInterface} from "../../../metadatas/components/FactionMetadataInterface";

export class FactionFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.factionTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|FactionMetadataInterface = {
			models: {
				header: true,
				lists: {
					pcs: {
						relationship: "reversed",
					},
					npcs: {
						relationship: "reversed",
					},
					locations: {},
					subplots: {
						relationship: "reversed",
					}
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
