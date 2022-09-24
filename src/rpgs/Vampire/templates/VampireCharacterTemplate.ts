import {CharacterTemplateFactory} from "../../../templates/frontmatter/CharacterTemplateFactory";

export class VampireCharacterTemplate extends CharacterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
	}

	public generateInitialCodeBlock(
	): string|undefined {
		return undefined;
	}

	public generateLastCodeBlock(
	): string|undefined {
		return undefined;
	}
}
