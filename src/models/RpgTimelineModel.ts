import {AbstractModel} from "../abstracts/AbstractModel";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {TimelineData, TimelineList} from "../data/TimelineData";

export class RpgTimelineModel extends AbstractModel {
	async render(){
		const data = new TimelineList(this.campaign);

		const events = this.dv.pages("#event")
			.where(event =>
				event?.dates?.event !== undefined &&
				event?.dates?.event !== null
			);

		events.forEach((event) => {
			data.add(
				new TimelineData(
					this.functions,
					event,
					'event',
				)
			)
		});

		let characters = this.dv.pages('#character')
			.where(character =>
				character?.dates?.dob !== undefined &&
				character?.dates?.dob !== null
			);

		characters.forEach((character) => {
			data.add(
				new TimelineData(
					this.functions,
					character,
					'birth',
				)
			)
		});

		characters = this.dv.pages('#character')
			.where(character =>
				character?.dates?.death !== undefined &&
				character?.dates?.death !== null
			);

		characters.forEach((character) => {
			character.add(
				new TimelineData(
					this.functions,
					character,
					'death',
				)
			)
		});

		const sessions = this.dv.pages('#session')
			.where(session =>
				session?.dates?.session !== undefined &&
				session?.dates?.session !== null
			);

		sessions.forEach((session) => {
			data.add(
				new TimelineData(
					this.functions,
					session,
					'session',
				)
			)
		});

		const clues = this.dv.pages('#clue')
			.where(clue =>
				clue?.dates?.found !== undefined &&
				clue?.dates?.found !== null
			);

		clues.forEach((clue) => {
			data.add(
				new TimelineData(
					this.functions,
					clue,
					'clue',
				)
			)
		});

		data.sort();

		const view = RpgViewFactory.createList(viewType.Timeline, this.dv);
		view.render(data);
	}
}
