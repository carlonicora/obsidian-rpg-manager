import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../database/interfaces/metadata/components/CharacterMetadataInterface";

export class CharacterFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.pcTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|CharacterMetadataInterface = {
			models: {
				header: true,
				lists: {
					factions: {},
					pcs: {
						relationship: "univocal",
					},
					npcs: {
						relationship: "univocal",
					},
					locations: {},
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false,
				dob: '',
				death: '',
				goals: '',
				pronoun: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
