import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {AdventureMetadataInterface} from "../../../metadatas/components/AdventureMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";
import {ActMetadataInterface} from "../../../metadatas/components/ActMetadataInterface";

export class AdventureTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.adventureTag + '/' + this.campaignId + '/' + this.adventureId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: AdventureMetadataInterface = {
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
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface = {
			models: {
				lists: {
					acts: {
						relationship: 'hierarchy'
					}
				}
			}
		}

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
