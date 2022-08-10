import {AbstractModel} from "../abstracts/AbstractModel";
import {Component, MarkdownRenderer} from "obsidian";
import {DateTime} from "obsidian-dataview";
import {RpgViewFactory} from "../factories/RpgViewFactory";

export class TimelineEvent {
	constructor(
		public time: DateTime,
		public link: string,
		public description: string,
		public type: string,
	) {
	}

	getEventColour(){
		switch (this.type){
			case 'event':
				return '';
				break;
			case 'birth':
				return ' green';
				break;
			case 'death':
				return ' red';
				break;
			case 'session':
				return ' blue';
				break;
		}
	}
}

export class RpgTimelineModel extends AbstractModel {
	async render(){
		let timelineEvents : TimelineEvent[] = [];

		const events = this.dv.pages("#event")
			.where(event =>
				event?.dates?.event !== undefined &&
				event?.dates?.event !== null
			);

		if (events !== undefined && events.length > 0) {
			for (let eventCount = 0; eventCount < events.length; eventCount++) {
				timelineEvents.push(new TimelineEvent(
					events[eventCount].dates.event,
					events[eventCount].file.link.markdown(this.dv.currentFilePath),
			events[eventCount].synopsis ? events[eventCount].synopsis : "",
					'event',
				));
			}
		}

		let characters = this.dv.pages('#character')
			.where(character =>
				character?.dates?.dob !== undefined &&
				character?.dates?.dob !== null
			);
		if (characters !== undefined && characters.length > 0){
			for (let charactersCount = 0; charactersCount < characters.length; charactersCount++){
				timelineEvents.push(new TimelineEvent(
					characters[charactersCount].dates.dob,
					characters[charactersCount].file.link.markdown(this.dv.currentFilePath),
					characters[charactersCount].synopsis ? characters[charactersCount].synopsis : "",
					'birth',
				));
			}
		}

		characters = this.dv.pages('#character')
			.where(character =>
				character?.dates?.death !== undefined &&
				character?.dates?.death !== null
			);
		if (characters !== undefined && characters.length > 0){
			for (let charactersCount = 0; charactersCount < characters.length; charactersCount++){
				timelineEvents.push(new TimelineEvent(
					characters[charactersCount].dates.death,
					characters[charactersCount].file.link.markdown(this.dv.currentFilePath),
					characters[charactersCount].synopsis ? characters[charactersCount].synopsis : "",
					'death',
				));
			}
		}

		const sessions = this.dv.pages('#session')
			.where(session =>
				session?.dates?.session !== undefined &&
				session?.dates?.session !== null
			);
		if (sessions !== undefined && sessions.length > 0){
			for (let sessionsCount = 0; sessionsCount < sessions.length; sessionsCount++){
				timelineEvents.push(new TimelineEvent(
					sessions[sessionsCount].dates.session,
					sessions[sessionsCount].file.link.markdown(this.dv.currentFilePath),
					sessions[sessionsCount].synopsis ?sessions[sessionsCount].synopsis : "",
					'session',
				));
			}
		}

		timelineEvents.sort((a,b) => {
			return a.time - b.time;
		});

		const campaigns = this.dv.pages("#campaign")
			.where(campaign =>
				campaign.file.folder !== 'Templates'
			);

		let campaignImage: string|null = null;
		if (campaigns !== undefined && campaigns.length > 0){
			campaignImage = this.functions.getImageLink(campaigns[0]);

			if (campaignImage !== null){
				campaignImage = ' style="background: url(\'' + campaignImage + '\');"';
			} else {
				campaignImage = '';
			}
		}

		const data = {
			events: timelineEvents,
			campaign: campaigns !== undefined && campaigns.length > 0 ? campaigns[0] : null,
			campaignImage: campaignImage,
		};

		const view = RpgViewFactory.create('Timeline', this.dv);
		view.render(data);
	}
}
