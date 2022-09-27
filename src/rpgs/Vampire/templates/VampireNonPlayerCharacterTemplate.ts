import {NonPlayerCharacterFrontmatterTemplateFactory} from "../../../factories/templates/frontmatter/NonPlayerCharacterFrontmatterTemplateFactory";

export class VampireNonPlayerCharacterTemplate extends NonPlayerCharacterFrontmatterTemplateFactory {
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
