import {AbstractComponentFrontmatterTemplateFactory} from "../../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {EventMetadataInterface} from "../../../metadatas/components/EventMetadataInterface";

export class EventFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.eventTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|EventMetadataInterface = {
			models: {
				header: true,
				lists: {
					subplots: {
						relationship: "reversed",
					},
					pcs: {},
					npcs: {},
					clues: {},
					locations: {},
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false,
				date: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}

