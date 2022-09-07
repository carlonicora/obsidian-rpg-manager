import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {CharacterInterface} from "../../../interfaces/data/CharacterInterface";
import {ResponseCharacterRecordSheet} from "../../../data/responses/ResponseCharacterRecordSheet";
import {ResponseType} from "../../../enums/ResponseType";
import {ContentType} from "../../../enums/ContentType";

export class CharacterRecordSheetComponent extends AbstractComponent{
	generateData(
		data: CharacterInterface,
		title: string | null,
	): ResponseElementInterface | null {
		const response = new ResponseCharacterRecordSheet(this.app);

		response.link = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(data.link, ContentType.Link);
		response.name = data.name;
		response.age = data.age;
		response.pronoun = data.pronoun;
		response.death = data.death;
		if (data.goals != null && data.goals != '') {
			response.goals = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(data.goals, ContentType.Markdown);
		}

		response.imgSrc = data.image;
		response.imgWidth = 300;
		response.imgHeight = 300;

		let synopsis = '<span class="rpgm-missing">Synopsis missing</span>';

		if (data.synopsis != null && data.synopsis !== '') {
			synopsis = '';
			synopsis += data.link.toString();
			const pronoun = data.pronoun;
			if (pronoun != null) {
				synopsis += this.app.plugins.getPlugin('rpg-manager').factories.pronouns.readPronoun(pronoun);
			}
			synopsis += (data.isDead) ? ' was ' : ' is ';
			synopsis += data.synopsis;
		}

		response.synopsis = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(synopsis, ContentType.Markdown);

		return response;
	}
}
