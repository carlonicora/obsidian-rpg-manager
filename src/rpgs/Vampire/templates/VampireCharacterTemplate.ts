import {CharacterFrontmatterTemplateFactory} from "../../../factories/templates/frontmatter/CharacterFrontmatterTemplateFactory";

export class VampireCharacterTemplate extends CharacterFrontmatterTemplateFactory {
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
