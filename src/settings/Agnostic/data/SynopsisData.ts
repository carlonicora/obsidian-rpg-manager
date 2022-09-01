import {AbstractData} from "../../../abstracts/AbstractData";
import {Pronoun} from "../../../enums/Pronoun";
import {GenericSynopsisDataInterface} from "../../../interfaces/data/GenericSynopsisDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {PronounFactory} from "../../../factories/PronounFactory";

export class SynopsisData extends AbstractData implements GenericSynopsisDataInterface {
	public synopsis: string;
	public death: string;
	public isCharacter: boolean;
	public pronoun: Pronoun|null;

	constructor(
		data: Record<string, any>,
		public title: string|null=null,
	) {
		super(data);

		this.synopsis = data.synopsis !== null ? data.synopsis : '';
		this.death = data.dates?.death !== undefined && data.dates?.death !== undefined ? RpgFunctions.formatDate(data.dates.death, "short") : '';

		this.isCharacter = false;
		data.tags.forEach((tag: string) => {
			if (tag.startsWith(RpgFunctions.settings.npcTag) || tag.startsWith(RpgFunctions.settings.pcTag)){
				this.isCharacter = true;
				this.pronoun = PronounFactory.create(data.pronoun);
			}
		});
	}
}
