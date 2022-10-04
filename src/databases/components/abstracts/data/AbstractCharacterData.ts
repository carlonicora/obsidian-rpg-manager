import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {Pronoun} from "../../../enums/Pronoun";
import {CharacterDataInterface} from "../../interfaces/data/CharacterDataInterface";
import {CharacterMetadataInterface} from "../../../../metadatas/components/CharacterMetadataInterface";

export class AbstractCharacterData extends AbstractComponent implements CharacterDataInterface {
	protected metadata: CharacterMetadataInterface;

	public get death(): Date | undefined {
		return (this.metadata.data?.death ? new Date(this.metadata.data.death) : undefined);
	}

	public get dob(): Date | undefined {
		return (this.metadata.data?.dob ? new Date(this.metadata.data.dob) : undefined);
	}

	public get goals(): string | undefined {
		return this.metadata.data?.goals;
	}

	public get pronoun(): Pronoun | undefined {
		if (this.metadata.data?.pronoun == null || this.metadata.data?.pronoun === '') return undefined;

		return this.factories.pronouns.createPronoun(this.metadata.data.pronoun);
	}
}
