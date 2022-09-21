import {AbstractComponent} from "../abstracts/AbstractComponent";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {ResponseLine} from "../data/responses/ResponseLine";
import {ContentType} from "../enums/ContentType";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class CharacterSynopsisComponent extends AbstractComponent{
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data = relationship.component as CharacterInterface;

		let fullSynopsis = '<span class="rpgm-missing">Synopsis missing</span>';

		if (data.synopsis != null && data.synopsis !== '') {
			fullSynopsis = '';
			if (data.isDead) {
				fullSynopsis = '_Deceased ' + data.death?.toDateString() + '_\n';
			}
			fullSynopsis += data.link.toString();
			const pronoun = data.pronoun;
			if (pronoun != null) {
				fullSynopsis += this.factories.pronouns.readPronoun(pronoun);
			}
			fullSynopsis += (data.isDead) ? ' was ' : ' is ';
			fullSynopsis += data.synopsis;
		}

		const response = new ResponseLine(this.app);
		response.content =this.factories.contents.create(
			fullSynopsis,
			ContentType.Markdown,
		);

		return response;
	}
}
