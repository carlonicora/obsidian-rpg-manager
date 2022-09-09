import {NonPlayerCharacterTemplate} from "../../Agnostic/templates/NonPlayerCharacterTemplate";

export class VampireNonPlayerCharacterTemplate extends NonPlayerCharacterTemplate {
	protected generateFrontmatterAdditionalInformation(
	): string {
		let response = super.generateFrontmatterAdditionalInformation();
		response += 'generation: \n';

		return response;
	}
}
