import {CharacterTemplateFactory} from "../../Agnostic/factories/CharacterTemplateFactory";
import {RpgCodeBlockInterface} from "../../../interfaces/RpgCodeBlockInterface";

export class VampireCharacterTemplate extends CharacterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
	}

	public generateInitialCodeBlock(
	): RpgCodeBlockInterface|undefined {
		return undefined;
	}

	public generateLastCodeBlock(
	): RpgCodeBlockInterface|undefined {
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
