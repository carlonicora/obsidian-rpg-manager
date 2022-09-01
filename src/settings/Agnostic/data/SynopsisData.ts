import {Api} from "../../../Api";
import {AbstractData} from "../../../abstracts/AbstractData";
import {Pronoun} from "../../../enums/Pronoun";
import {GenericSynopsisDataInterface} from "../../../interfaces/data/GenericSynopsisDataInterface";
import {Factory} from "../../../Factory";

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
				this.pronoun = Factory.createPronoun(data.pronoun);
			}
		});
	}
}
