import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {EventMetadataInterface} from "../../../metadatas/components/EventMetadataInterface";

export class EventTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.eventTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: EventMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				complete: false,
				date: ''
			}
		};
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true,
				lists: {
					subplots: {},
					pcs: {},
					npcs: {},
					clues: {},
					locations: {},
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
