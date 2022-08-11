import {GenericSynopsisDataInterface} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractData} from "../abstracts/AbstractData";

export class SynopsisData extends AbstractData implements GenericSynopsisDataInterface {
	public synopsis: string;
	public death: string;
	public isCharacter: boolean;

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		public title: string|null=null,
	) {
		super(functions, data);

		this.synopsis = data.synopsis !== null ? data.synopsis : '';
		this.death = data.dates?.death !== undefined && data.dates?.death !== undefined ? this.functions.formatDate(data.dates.death, "short") : '';
		this.isCharacter = data.tags.indexOf('character/npc') !== -1;
	}
}
