import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../../../interfaces/response/ResponseElementInterface";
import {ResponseHeader} from "../../../data/responses/ResponseHeader";
import {ContentType} from "../../../enums/ContentType";
import {RpgDataInterface} from "../../../interfaces/data/RpgDataInterface";
import {Character} from "../data/Character";
import {Clue} from "../data/Clue";
import {Location} from "../data/Location";
import {Event} from "../data/Event";
import {Scene} from "../data/Scene";

export class HeaderComponent extends AbstractComponent{
	generateData(
		data: RpgDataInterface,
		title: string | null,
		additionalInformation: any|null = null,
	): ResponseElementInterface | null {
		const response = new ResponseHeader(this.app);

		response.link = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(data.link, ContentType.Link);
		response.name = data.name;

		let synopsis = '<span class="rpgm-missing">Synopsis missing</span>';

		if (data instanceof Character) {
			response.age = data.age;
			response.pronoun = data.pronoun;
			response.death = data.death;
			if (data.goals != null && data.goals != '') {
				response.goals = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(data.goals, ContentType.Markdown);
			}

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
		} else {
			if (data instanceof Clue){
				const clueFound = data.isFound
					? 'Clue found on ' + data.found?.toDateString()
					: '<span class="rpgm-missing">Clue not found yet</span>';

				response.clueFound = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(clueFound, ContentType.Markdown);
			} else if (data instanceof Location){
				if (data.address != null && data.address != ''){
					response.address = data.address;
				}
			} else if (data instanceof Event){
				if (data.date != null) {
					response.date = data.date;
				}
			} else if (data instanceof Scene){
				response.synopsisTitle = 'Scene Goal';

				if (data.action != null && data.action != ''){
					response.action = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(data.action, ContentType.Markdown);
				} else if (additionalInformation != null && additionalInformation.action != null && additionalInformation.action != ''){
					response.action = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(additionalInformation.action, ContentType.Markdown);
				}

				if (additionalInformation != null && additionalInformation.trigger != null && additionalInformation.trigger != ''){
					response.trigger = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(additionalInformation.trigger, ContentType.Markdown);
				}
			}

			if (data.synopsis != null && data.synopsis != ''){
				synopsis = data.synopsis;
			}
			response.synopsis = this.app.plugins.getPlugin('rpg-manager').factories.contents.create(synopsis, ContentType.Markdown);
		}

		response.imgSrc = data.image;
		response.imgWidth = 300;
		response.imgHeight = 300;



		return response;
	}
}
