import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SubplotMetadataInterface} from "../../../metadatas/components/SubplotMetadataInterface";

export class SubplotTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.subplotTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: SubplotMetadataInterface = {
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
				image: '',
				complete: false
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
					events: {},
					clues: {},
					factions: {},
					npcs: {},
					locations: {},
				}
			},
		};
		return this.generateRpgManagerCodeBlock(metadata);
	}
}
