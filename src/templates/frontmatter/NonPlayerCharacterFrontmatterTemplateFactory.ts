import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {CharacterMetadataInterface} from "../../database/interfaces/metadata/components/CharacterMetadataInterface";

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

