import {AbstractComponent} from "../../../core/abstracts/AbstractComponent";
import {Pronoun} from "../enums/Pronoun";
import {CharacterDataInterface} from "../interfaces/CharacterDataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {DateHelper} from "../../../core/helpers/DateHelper";
import {DateInterface} from "../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../services/date/DateService";

export class AbstractCharacterData extends AbstractComponent implements CharacterDataInterface {
	protected metadata: CharacterMetadataInterface;

	public get death(): DateInterface | undefined {
		return this.api.services.get(DateService)?.getDate(
			this.metadata.data?.death,
			this.frontmatter['fc-date'],
			this,
		);
	}

	public get dob(): DateInterface | undefined {
		return this.api.services.get(DateService)?.getDate(
			this.metadata.data?.dob,
			this.frontmatter['fc-date'],
			this,
		);
	}

	public get goals(): string | undefined {
		return this.metadata.data?.goals;
	}

	public get pronoun(): Pronoun | undefined {
		if (this.metadata.data?.pronoun == null || this.metadata.data?.pronoun === '') return undefined;

		return this.factories.pronouns.createPronoun(this.metadata.data.pronoun);
	}
}
