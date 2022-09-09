import {CharacterTemplate} from "../../Agnostic/templates/CharacterTemplate";

export class VampireCharacterTemplate extends CharacterTemplate {

	protected generateFrontmatterAdditionalInformation(
	): string {
		let response = super.generateFrontmatterAdditionalInformation();
		response += 'generation: \n';

		return response;
	}
}
