import {AbstractHeaderSubModel} from "../../../../models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeaderElement} from "../../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {ResponseHeader} from "../../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseType} from "../../../../responses/enums/ResponseType";
import {CharacterInterface} from "../interfaces/CharacterInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../../services/date/DateService";

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

		let goals = this.data?.goals;
		if (this.data.goals == null || this.data.goals === '') goals = '<span class="rpgm-missing">Goals missing</span>';

		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Goals', goals, HeaderResponseType.Long, {editableField: 'data.goals'}));

		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Pronoun', this.data.pronoun, HeaderResponseType.Pronoun));

		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'Birth',
				this.api.service.get<DateService>(DateService)?.getReadableDate(this.data.dob, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.dob',
					date: this.data.dob,
					placeholder: 'Select the birth date of the character'
				}
			)
		);

		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'Death',
				this.api.service.get<DateService>(DateService)?.getReadableDate(this.data.death, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector),
				{
					yamlIdentifier: 'data.death',
					date: this.data.death,
					placeholder: 'Select the death date of the character'
				}
			)
		);

		if (this.data.age != null || this.data.death != null) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Status', this.data.death ? 'Dead' : 'Alive', HeaderResponseType.Short));
		}

		if (this.data.death != null){
			let death = this.api.service.get<DateService>(DateService)?.getReadableDate(this.data.death, this.data);
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
