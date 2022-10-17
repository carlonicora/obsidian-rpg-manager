import {CharacterInterface} from "./interfaces/CharacterInterface";
import {CharacterMetadataInterface} from "./interfaces/CharacterMetadataInterface";
import {AbstractCharacterData} from "./abstracts/AbstractCharacterData";
import {DateHelper} from "../../../helpers/DateHelper";

export class Character extends AbstractCharacterData implements CharacterInterface {
	protected metadata: CharacterMetadataInterface;

	get age(): number | undefined {
		if (this.dob === undefined) return undefined;

		if (this.death === undefined && this.campaign.date === undefined) return undefined;

		const end = this.death ? this.death : this.campaign.date;
		if (end === undefined) return undefined;

		return DateHelper.age(this.dob, end);
	}

	get isDead(): boolean {
		return this.death !== undefined;
	}
}
