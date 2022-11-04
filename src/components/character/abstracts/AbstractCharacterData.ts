import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {Pronoun} from "../../../services/pronounService/enums/Pronoun";
import {CharacterDataInterface} from "../interfaces/CharacterDataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {PronounService} from "../../../services/pronounService/PronounService";
import {DateService} from "../../../services/dateService/DateService";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";

export class AbstractCharacterData extends AbstractModel implements CharacterDataInterface {
	protected metadata: CharacterMetadataInterface;

	public get death(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.death,
			this.frontmatter['fc-dateService'],
			this,
		);
	}

	public get dob(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.dob,
			this.frontmatter['fc-dateService'],
			this,
		);
	}

	public get goals(): string | undefined {
		const response: string|undefined = this.metadata.data?.goals;

		if (response === undefined || response === '')
			return undefined;

		return response;
	}

	public get pronoun(): Pronoun | undefined {
		if (this.metadata.data?.pronoun == null || this.metadata.data?.pronoun === '')
			return undefined;

		return this.api.service(PronounService).createPronoun(this.metadata.data.pronoun);
	}
}
