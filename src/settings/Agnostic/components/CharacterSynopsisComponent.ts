import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {ResponseLine} from "../../../data/responses/ResponseLine";
import {PronounFactory} from "../../../factories/PronounFactory";
import {ContentFactory} from "../../../factories/ContentFactory";
import {ContentType} from "../../../enums/ContentType";

export class CharacterSynopsisComponent extends AbstractComponent{
	generateData(
		data: CharacterDataInterface,
		title: string | null,
	): ResponseElementInterface | null {
		let fullSynopsis = '<span class="rpgm-missing">Synopsis missing</span>';

		if (data.synopsis != null && data.synopsis !== '') {
			fullSynopsis = '';
			if (data.isDead) {
				fullSynopsis = '_Deceased ' + data.death + '_\n';
			}
			fullSynopsis += data.link.toString();
			const pronoun = data.pronoun;
			if (pronoun != null) {
				fullSynopsis += PronounFactory.readPronoun(pronoun);
			}
			fullSynopsis += (data.isDead) ? ' was ' : ' is ';
			fullSynopsis += data.synopsis;
		}

		const response = new ResponseLine();
		response.content =ContentFactory.create(
			fullSynopsis,
			ContentType.Markdown,
		);

		return response;
	}
}
