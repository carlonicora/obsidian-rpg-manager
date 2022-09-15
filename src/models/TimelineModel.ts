import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {TimelineResponse} from "../data/responses/TimelineResponse";
import {TimelineElementResponse} from "../data/responses/TimelineElementResponse";
import {TimelineResponseInterface} from "../interfaces/response/TimelineResponseInterface";
import {DataType} from "../enums/DataType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";

export class TimelineModel extends AbstractModel {
	protected currentElement: RpgDataInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const response = new ResponseData();

		response.addElement(
			await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
				this.currentElement.campaign.settings,
				'Banner',
				this.currentElement,
			)
		);

		const timeline = new TimelineResponse(this.app);

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
		const events = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: EventInterface) =>
			data.campaign != null &&
			data.campaign.campaignId === this.currentElement.campaign.campaignId &&
			data.type === DataType.Event &&
			data.date != null
		);

		events.elements.forEach((event: EventInterface) => {
			if (event.date != null) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length-3);
				timeline.elements.push(
					new TimelineElementResponse(
						event.date,
						(<Date>event.date).toDateString(),
						time,
						'event',
						event.synopsis ?? '',
						event.link,
					)
				)
			}
		});
	}

	private addClues(
		timeline: TimelineResponseInterface,
	): void {
		const clues = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: ClueInterface) =>
			data.campaign != null &&
			data.campaign.campaignId === this.currentElement.campaign.campaignId &&
			data.type === DataType.Clue &&
			data.isFound === true
		);
		clues.elements.forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						clue.found,
						(<Date>clue.found).toDateString(),
						'00:00',
						'clue',
						clue.synopsis ?? '',
						clue.link,
					)
				)
			}
		});
	}

	private addBirths(
		timeline: TimelineResponseInterface,
	): void {
		const characters = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: CharacterInterface) =>
			data.campaign != null &&
			data.campaign.campaignId === this.currentElement.campaign.campaignId &&
			(data.type === DataType.Character || data.type === DataType.NonPlayerCharacter) &&
			data.dob != null
		);
		characters.elements.forEach((character: CharacterInterface) => {
			if (character.dob != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						character.dob,
						(<Date>character.dob).toDateString(),
						'00:00',
						'birth',
						character.synopsis ?? '',
						character.link,
					)
				)
			}
		});
	}

	private addDeaths(
		timeline: TimelineResponseInterface,
	): void {
		const characters = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: CharacterInterface) =>
			data.campaign != null &&
			data.campaign.campaignId === this.currentElement.campaign.campaignId &&
			(data.type === DataType.Character || data.type === DataType.NonPlayerCharacter) &&
			data.death != null
		);
		characters.elements.forEach((character: CharacterInterface) => {
			if (character.death != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						character.death,
						(<Date>character.death).toDateString(),
						'00:00',
						'death',
						character.synopsis ?? '',
						character.link,
					)
				)
			}
		});
	}

	private addSessions(
		timeline: TimelineResponseInterface,
	): void {
		const sessions = this.app.plugins.getPlugin('rpg-manager').io.getElements((data: SessionInterface) =>
			data.campaign != null &&
			data.campaign.campaignId === this.currentElement.campaign.campaignId &&
			data.type === DataType.Session &&
			data.date != null
		);
		sessions.elements.forEach((session: SessionInterface) => {
			if (session.date != null) {
				timeline.elements.push(
					new TimelineElementResponse(
						session.date,
						(<Date>session.date).toDateString(),
						'00:00',
						'session',
						session.synopsis ?? '',
						session.link,
					)
				)
			}
		});
	}
}
