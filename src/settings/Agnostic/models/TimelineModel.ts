import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";

export class TimelineModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();
		return response;
	}

	/*
	async render(){
		const data = new TimelineList(this.campaign);

		let query = '#' + this.api.settings.eventTag + '/' + this.campaign.id;
		const events = this.dv.pages(query)
			.where(event =>
				event?.dates?.event !== undefined &&
				event?.dates?.event !== null
			);

		events.forEach((event) => {
			data.add(
				new TimelineData(
					this.api,
					event,
					'event',
				)
			)
		});

		query = '(#' + this.api.settings.npcTag + '/' + this.campaign.id + ' or #' + this.api.settings.pcTag + '/' + this.campaign.id + ')';
		let characters = this.dv.pages(query)
			.where(character =>
				character?.dates?.dob !== undefined &&
				character?.dates?.dob !== null
			);

		characters.forEach((character) => {
			data.add(
				new TimelineData(
					this.api,
					character,
					'birth',
				)
			)
		});

		characters = this.dv.pages(query)
			.where(character =>
				character?.dates?.death !== undefined &&
				character?.dates?.death !== null
			);

		characters.forEach((character) => {
			data.add(
				new TimelineData(
					this.api,
					character,
					'death',
				)
			)
		});

		query = '#' + this.api.settings.sessionTag + '/' + this.campaign.id;
		const sessions = this.dv.pages(query)
			.where(session =>
				session?.dates?.session !== undefined &&
				session?.dates?.session !== null
			);

		sessions.forEach((session) => {
			data.add(
				new TimelineData(
					this.api,
					session,
					'session',
				)
			)
		});

		query = '#' + this.api.settings.clueTag + '/' + this.campaign?.id;
		const clues = this.dv.pages(query)
			.where(clue =>
				clue?.dates?.found !== undefined &&
				clue?.dates?.found !== null
			);

		clues.forEach((clue) => {
			data.add(
				new TimelineData(
					this.api,
					clue,
					'clue',
				)
			)
		});

		data.sort();

		const view = ViewFactory.createList(ViewType.Timeline, this.dv);
		view.render(data, null);
	}

	 */
}
