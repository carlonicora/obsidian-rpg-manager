import {CharacterInterface} from "../interfaces/CharacterInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {AbstractCharacterData} from "../abstracts/AbstractCharacterData";
import {DateService} from "../../../services/dateService/DateService";

export class CharacterModel extends AbstractCharacterData implements CharacterInterface {
	protected metadata: CharacterMetadataInterface;

	get age(): number | undefined {
		return this.api.service(DateService).getAge(this.dob, this.death, this.campaign.date, this);
	}

	get isDead(): boolean {
		return this.death !== undefined;
	}
}
