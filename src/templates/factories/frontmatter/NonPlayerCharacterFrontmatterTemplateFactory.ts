import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../../metadatas/components/CharacterMetadataInterface";

export class NonPlayerCharacterFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.npcTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|CharacterMetadataInterface = {
			models: {
				header: true,
				lists: {
					subplots: {},
					pcs: {
						relationship: "univocal",
					},
					npcs: {
						relationship: "univocal",
					},
					factions: {},
					locations: {},
					events: {},
					clues: {},
				}
			},
			data: {
				synopsis: '',
				image: '',
				death: '',
				dob: '',
				goals: '',
				pronoun: '',
				complete: false
			}
		}

		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}

