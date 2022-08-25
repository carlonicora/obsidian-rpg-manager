import {GenericSynopsisDataInterface} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractData} from "../abstracts/AbstractData";
import {Pronoun, PronounFactory} from "./CharacterData";

export class SynopsisData extends AbstractData implements GenericSynopsisDataInterface {
	public synopsis: string;
	public death: string;
	public isCharacter: boolean;
	public pronoun: Pronoun|null;

	constructor(
		api: Api,
		data: Record<string, any>,
		public title: string|null=null,
	) {
		super(api, data);

		this.synopsis = data.synopsis !== null ? data.synopsis : '';
		this.death = data.dates?.death !== undefined && data.dates?.death !== undefined ? this.api.formatDate(data.dates.death, "short") : '';

		this.isCharacter = false;
		data.tags.forEach((tag: string) => {
			if (tag.startsWith(this.api.settings.npcTag) || tag.startsWith(this.api.settings.pcTag)){
				this.isCharacter = true;
				this.pronoun = PronounFactory.create(data.pronoun);
			}
		});
	}
}
