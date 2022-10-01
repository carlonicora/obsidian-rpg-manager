import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {CharacterV2Interface} from "./interfaces/CharacterV2Interface";
import {CharacterMetadataInterface} from "../interfaces/metadatas/CharacterMetadataInterface";
import {Pronoun} from "../../enums/Pronoun";

export class CharacterV2 extends AbstractComponentV2 implements CharacterV2Interface {
	protected metadata: CharacterMetadataInterface;

	get age(): number | undefined {
		const dob: Date|undefined = this.dob;
		if (dob === undefined) return undefined;

		if (this.death == null && this.campaign.date == undefined) return undefined;

		const end = this.death ? this.death : this.campaign.date;
		if (end === undefined) return undefined;

		const ageDifMs = end.valueOf() - dob.valueOf();
		const ageDate = new Date(ageDifMs);

		return (Math.abs(ageDate.getUTCFullYear() - 1970));
	}

	get death(): Date | undefined {
		return (this.metadata.death ? new Date(this.metadata.death) : undefined);
	}

	get dob(): Date | undefined {
		return (this.metadata.dob ? new Date(this.metadata.dob) : undefined);
	}

	get goals(): string | undefined {
		return this.metadata.goals;
	}

	get isDead(): boolean {
		return this.metadata.death !== undefined;
	}

	get pronoun(): Pronoun | undefined {
		return this.metadata.pronoun;
	}


}
