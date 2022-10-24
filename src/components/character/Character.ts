import {CharacterInterface} from "./interfaces/CharacterInterface";
import {CharacterMetadataInterface} from "./interfaces/CharacterMetadataInterface";
import {AbstractCharacterData} from "./abstracts/AbstractCharacterData";
import {DateHelper} from "../../core/helpers/DateHelper";
import {DateService} from "../../services/date/DateService";

export class Character extends AbstractCharacterData implements CharacterInterface {
	protected metadata: CharacterMetadataInterface;

	get age(): number | undefined {
		return this.api.services.get<DateService>(DateService)?.getAge(this.dob, this.death, this.campaign.date, this);
	}

	get isDead(): boolean {
		return this.death !== undefined;
	}
}
