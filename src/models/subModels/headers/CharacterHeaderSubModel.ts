import {AbstractHeaderSubModel} from "../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../databases/enums/ComponentType";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {CharacterInterface} from "../../../databases/components/interfaces/CharacterInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

export class CharacterHeaderSubModel extends AbstractHeaderSubModel {
	protected data: CharacterInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		if (this.data.synopsis != null && this.data.synopsis !== '') {
			this.synopsis = '';
			this.synopsis += this.data.file.path.toString();
			const pronoun = this.data.pronoun;
			if (pronoun != null) {
				this.synopsis += this.factories.pronouns.readPronoun(pronoun);
			}
			this.synopsis += (this.data.isDead) ? ' was ' : ' is ';
			this.synopsis += this.data.synopsis;
		}

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Character;
		response.responseType = ResponseType.CharacterHeader;

		if (this.data.goals != null) response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Goals', this.data.goals.toString(), HeaderResponseType.Long));

		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Pronoun', this.data.pronoun, HeaderResponseType.Pronoun));
		if (this.data.age != null || this.data.death != null) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Status', this.data.death ? 'Dead' : 'Alive', HeaderResponseType.Short));
		}
		if (this.data.death != null){
			let death = this.data.death.toDateString();
			if (this.data.age != null){
				death += ' at age ' + this.data.age;
			}
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Death', death, HeaderResponseType.Short));
		} else if (this.data.age != null) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Age', this.data.age.toString(), HeaderResponseType.Short));
		}

		return this.completeData(response);
	}
}
