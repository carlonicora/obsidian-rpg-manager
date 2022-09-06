import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {ComponentFactory, SingleComponentKey} from "../../../factories/ComponentFactory";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {RpgFunctions} from "../../../RpgFunctions";
import {TimelineResponse} from "../../../data/responses/TimelineResponse";
import {TimelineElementResponse} from "../../../data/responses/TimelineElementResponse";
import {DataFactory, SingleDataKey} from "../../../factories/DataFactory";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {TimelineResponseInterface} from "../../../interfaces/response/TimelineResponseInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";

export class TimelineModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();

		response.addElement(
			ComponentFactory.create(
				CampaignSetting[this.campaign.settings] + 'Banner' as SingleComponentKey<any>,
				this.io,
				this.specificData,
			)
		);

		const timeline = new TimelineResponse();

		if (this.sourceMeta.events === true){
			this.addEvents(timeline);
		}

		if (this.sourceMeta.clues === true){
			this.addClues(timeline);
		}

		if (this.sourceMeta.births === true){
			this.addBirths(timeline);
		}

		if (this.sourceMeta.deaths === true){
			this.addDeaths(timeline);
		}

		if (this.sourceMeta.sessions === true){
			this.addSessions(timeline);
		}

		timeline.sort();
		response.addElement(timeline);

		return response;
	}

	private addEvents(
		timeline: TimelineResponseInterface,
	): void {
		const query = '#' + RpgFunctions.settings.eventTag + '/' + this.campaign.id;
		const events = this.dv.pages(query)
			.where(event =>
				event?.dates?.event !== undefined &&
				event?.dates?.event !== null
			);

		events.forEach((event) => {
			const evt = DataFactory.create(
				CampaignSetting[this.campaign.settings] + 'Event' as SingleDataKey<any>,
				event,
				this.campaign,
			);
			timeline.elements.push(
				new TimelineElementResponse(
					new Date((<EventDataInterface>evt).date + ' ' + (<EventDataInterface>evt).time),
					(<EventDataInterface>evt).date,
					(<EventDataInterface>evt).time,
					'event',
					(<EventDataInterface>evt).synopsis,
					(<EventDataInterface>evt).link,
				)
			)
		});
	}

	private addClues(
		timeline: TimelineResponseInterface,
	): void {
		const query = '#' + RpgFunctions.settings.clueTag + '/' + this.campaign?.id;
		const clues = this.dv.pages(query)
			.where(clue =>
				clue?.dates?.found !== undefined &&
				clue?.dates?.found !== null
			);

		clues.forEach((clue) => {
			const clt = DataFactory.create(
				CampaignSetting[this.campaign.settings] + 'Clue' as SingleDataKey<any>,
				clue,
				this.campaign,
			);
			const found = (<ClueDataInterface>clt).found;
			const date: string = (typeof found === 'boolean' ? '00:00' : found);
			timeline.elements.push(
				new TimelineElementResponse(
					new Date(date),
					date,
					'00:00',
					'clue',
					(<ClueDataInterface>clt).synopsis,
					clt.link,
				)
			)
		});
	}

	private addBirths(
		timeline: TimelineResponseInterface,
	): void {
		const query = '(#' + RpgFunctions.settings.npcTag + '/' + this.campaign.id + ' or #' + RpgFunctions.settings.pcTag + '/' + this.campaign.id + ')';
		const characters = this.dv.pages(query)
			.where(character =>
				character?.dates?.dob !== undefined &&
				character?.dates?.dob !== null
			);

		characters.forEach((character) => {
			const char = DataFactory.create(
				CampaignSetting[this.campaign.settings] + 'Character' as SingleDataKey<any>,
				character,
				this.campaign,
			);
			const dobString = (<CharacterDataInterface>char).dob;
			const dob: string = (dobString == null ? '00:00' : dobString);
			timeline.elements.push(
				new TimelineElementResponse(
					new Date(dob),
					dob,
					'00:00',
					'birth',
					(<ClueDataInterface>char).synopsis,
					char.link,
				)
			)
		});
	}

	private addDeaths(
		timeline: TimelineResponseInterface,
	): void {
		const query = '(#' + RpgFunctions.settings.npcTag + '/' + this.campaign.id + ' or #' + RpgFunctions.settings.pcTag + '/' + this.campaign.id + ')';
		const characters = this.dv.pages(query)
			.where(character =>
				character?.dates?.death !== undefined &&
				character?.dates?.death !== null
			);

		characters.forEach((character) => {
			const char = DataFactory.create(
				CampaignSetting[this.campaign.settings] + 'Character' as SingleDataKey<any>,
				character,
				this.campaign,
			);
			const deathString = (<CharacterDataInterface>char).death;
			const death: string = (deathString == null ? '00:00' : deathString);
			timeline.elements.push(
				new TimelineElementResponse(
					new Date(death),
					death,
					'00:00',
					'death',
					(<ClueDataInterface>char).synopsis,
					char.link,
				)
			)
		});
	}

	private addSessions(
		timeline: TimelineResponseInterface,
	): void {
		const query = '#' + RpgFunctions.settings.sessionTag + '/' + this.campaign.id;
		const sessions = this.dv.pages(query)
			.where(session =>
				session?.dates?.session !== undefined &&
				session?.dates?.session !== null
			);

		sessions.forEach((session) => {
			const sess = DataFactory.create(
				CampaignSetting[this.campaign.settings] + 'Session' as SingleDataKey<any>,
				session,
				this.campaign,
			);

			timeline.elements.push(
				new TimelineElementResponse(
					new Date((<SessionDataInterface>sess).date),
					(<SessionDataInterface>sess).date,
					'00:00',
					'session',
					(<SessionDataInterface>sess).synopsis,
					sess.link,
				)
			)
		});
	}
}
