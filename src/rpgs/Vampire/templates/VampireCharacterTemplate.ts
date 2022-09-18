import {CharacterTemplateFactory} from "../../../factories/templates/CharacterTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";

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

/*

protected generateFrontmatterAdditionalInformation(
): string {
	let response = super.generateFrontmatterAdditionalInformation();
	response += 'generation: \n';

	return response;
}

 */
}
