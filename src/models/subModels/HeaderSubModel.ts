import {AbstractSubModel} from "../../abstracts/AbstractSubModel";
import {ResponseDataElementInterface} from "../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../responses/ResponseHeader";
import {ContentType} from "../../enums/ContentType";
import {Character} from "../../components/Character";
import {Clue} from "../../components/Clue";
import {Location} from "../../components/Location";
import {Event} from "../../components/Event";
import {Scene} from "../../components/Scene";
import {ResponseHeaderElement} from "../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {Music} from "../../components/Music";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {Session} from "../../components/Session";
import {StoryCircleStage} from "../../enums/StoryCircleStage";
import {ComponentType} from "../../enums/ComponentType";
import {Campaign} from "../../components/Campaign";
import {Act} from "../../components/Act";
import {Adventure} from "../../components/Adventure";
import {AbtStage} from "../../enums/AbtStage";

export class HeaderSubModel extends AbstractSubModel{
	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (relationship.component === undefined) return null;
		const data = relationship.component;

		const response = new ResponseHeader(this.app, this.currentElement);

		response.link = this.factories.contents.create(data.link, ContentType.Link);
		response.name = data.name;

		let synopsis = '<span class="rpgm-missing">Synopsis missing</span>';
		let synopsisTitle = 'Synopsis';

		if (data instanceof Character) {
			response.type = ComponentType.Character;
			if (data.synopsis != null && data.synopsis !== '') {
				synopsis = '';
				synopsis += data.link.toString();
				const pronoun = data.pronoun;
				if (pronoun != null) {
					synopsis += this.factories.pronouns.readPronoun(pronoun);
				}
				synopsis += (data.isDead) ? ' was ' : ' is ';
				synopsis += data.synopsis;
			}
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Synopsis', synopsis, HeaderResponseType.Long));

			if (data.goals != null) response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Goals', data.goals.toString(), HeaderResponseType.Long));

			if (data.pronoun != null) response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Pronoun', this.factories.pronouns.readPronoun(data.pronoun), HeaderResponseType.Short));
			if (data.age != null || data.death != null) {
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Status', data.death ? 'Dead' : 'Alive', HeaderResponseType.Short));
			}
			if (data.death != null){
				let death = data.death.toDateString();
				if (data.age != null){
					death += ' at age ' + data.age;
				}
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Death', death, HeaderResponseType.Short));
			} else if (data.age != null) {
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Age', data.age.toString(), HeaderResponseType.Short));			}

		} else {
			if (data instanceof Adventure){
				response.type = ComponentType.Adventure;
			}
			if (data instanceof Scene) {
				response.type = ComponentType.Scene;
				synopsisTitle = 'Scene Goal';
			}

			if (data.synopsis != null && data.synopsis != '') {
				synopsis = data.synopsis;
			}
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, synopsisTitle, synopsis, HeaderResponseType.Long));

			if (data instanceof Clue){
				response.type = ComponentType.Clue;
				const clueFound = data.isFound
					? 'Clue found on ' + data.found?.toDateString()
					: '<span class="rpgm-missing">Clue not found yet</span>';

				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Found', clueFound, HeaderResponseType.Short));
			} else if (data instanceof Location){
				response.type = ComponentType.Location;
				if (data.address != null && data.address != ''){
					response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Address', data.address, HeaderResponseType.Short));
				}
			} else if (data instanceof Event){
				response.type = ComponentType.Event;
				if (data.date != null) {
					response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Date', data.date.toDateString(), HeaderResponseType.Short));
				}
			} else if (data instanceof Scene){
				response.type = ComponentType.Scene;
				if (additionalInformation != null && additionalInformation.trigger != null && additionalInformation.trigger != ''){
					response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Trigger', additionalInformation.trigger, HeaderResponseType.Long));
				}

				if (data.action != null && data.action != ''){
					response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Action', data.action, HeaderResponseType.Long));
				} else if (additionalInformation != null && additionalInformation.action != null && additionalInformation.action != ''){
					response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Action', additionalInformation.action, HeaderResponseType.Long));
				}
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Session', (data.sessionId === undefined ? '' : data.sessionId.toString()), HeaderResponseType.SessionSelection, {sceneId: data.id, file: data.file}));
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Story Circle Stage', (data.storycircleStage !== undefined ? StoryCircleStage[data.storycircleStage] : ''), HeaderResponseType.SceneStoryCircle, {sceneId: data.id, file: data.file}));

			} else if (data instanceof Music){
				response.type = ComponentType.Music;
				if (data.image === undefined) {
					response.imgSrc = await data.getThumbnail();
				} else if (data.image !== null) {
					response.imgSrc = data.image;
				}

				if (data.url !== undefined) response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'link', data.url, HeaderResponseType.Long));
			} else if (data instanceof Session) {
				response.type = ComponentType.Session;
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Scenes', '', HeaderResponseType.ScenesSelection, {session: data}));
			} else if (data instanceof Campaign){
				response.type = ComponentType.Campaign;
				response.metadata = {campaignId: data.id};
			} else if (data instanceof Act) {
				response.type = ComponentType.Act;
				response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'ABT Stage', (data.abtStage !== undefined ? AbtStage[data.abtStage] : ''), HeaderResponseType.ActAbt, {sceneId: data.id, file: data.file}));
			}
		}

		if (data.image !== null) {
			response.imgSrc = data.image;
			response.imgWidth = 300;
			response.imgHeight = 300;
		}

		return response;
	}
}
