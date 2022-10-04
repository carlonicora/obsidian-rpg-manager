import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {FactionMetadataInterface} from "../../database/interfaces/metadata/components/FactionMetadataInterface";

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
