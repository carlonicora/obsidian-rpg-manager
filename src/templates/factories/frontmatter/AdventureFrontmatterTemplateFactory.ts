import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {AdventureMetadataInterface} from "../../../metadatas/components/AdventureMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";

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

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|ActDataInterface = {
			models: {
				lists: {
					acts: {
						relationship: 'hierarchy'
					}
				}
			}
		}
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
