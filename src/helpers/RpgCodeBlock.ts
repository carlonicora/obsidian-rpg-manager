import {stringifyYaml} from "obsidian";
import {RpgCodeBlockInterface} from "../interfaces/RpgCodeBlockInterface";

export class RpgCodeBlock implements RpgCodeBlockInterface {
	constructor(
		public model: string,
		public additionalInformation: any|undefined = undefined,
	) {
	}

	public toString(
	): string {
		let response = '```RpgManager\n';
		response += this.model + '\n';

		if (this.additionalInformation !== undefined){
			response += stringifyYaml(this.additionalInformation);
		}

		response += '```\n';

		return response;
	}
}
