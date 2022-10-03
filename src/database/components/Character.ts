import {CharacterInterface} from "./interfaces/CharacterInterface";
import {CharacterMetadataInterface} from "../interfaces/metadata/components/CharacterMetadataInterface";
import {AbstractCharacterData} from "./abstracts/data/AbstractCharacterData";

export class Character extends AbstractCharacterData implements CharacterInterface {
	protected metadata: CharacterMetadataInterface;

	get age(): number | undefined {
		if (this.dob === undefined) return undefined;

		if (this.death === undefined && this.campaign.date === undefined) return undefined;

		const end = this.death ? this.death : this.campaign.date;
		if (end === undefined) return undefined;

		const ageDifMs = end.valueOf() - this.dob.valueOf();
		const ageDate = new Date(ageDifMs);

		return (Math.abs(ageDate.getUTCFullYear() - 1970));
	}

	get isDead(): boolean {
		return this.death !== undefined;
	}
}
