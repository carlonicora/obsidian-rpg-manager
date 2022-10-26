import {AbstractModel} from "../../../api/modelsManager/abstracts/AbstractModel";
import {Pronoun} from "../../../services/pronounService/enums/Pronoun";
import {CharacterDataInterface} from "../interfaces/CharacterDataInterface";
import {CharacterMetadataInterface} from "../interfaces/CharacterMetadataInterface";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";
import {PronounService} from "../../../services/pronounService/PronounService";

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
		return this.metadata.data?.goals;
	}

	public get pronoun(): Pronoun | undefined {
		if (this.metadata.data?.pronoun == null || this.metadata.data?.pronoun === '')
			return undefined;

		return this.api.service(PronounService).createPronoun(this.metadata.data.pronoun);
	}
}
