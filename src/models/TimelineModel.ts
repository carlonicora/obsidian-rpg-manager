import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {TimelineResponse} from "../data/responses/TimelineResponse";
import {TimelineElementResponse} from "../data/responses/TimelineElementResponse";
import {TimelineResponseInterface} from "../interfaces/response/TimelineResponseInterface";
import {DataType} from "../enums/DataType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {BannerComponent} from "../components/BannerComponent";

export class TimelineModel extends AbstractModel {
	protected currentElement: RecordInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(BannerComponent,this.currentElement);

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
		this.response.addElement(timeline);

		return this.response;
	}

	private addEvents(
		timeline: TimelineResponseInterface,
	): void {
		const events = this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<EventInterface>(
			DataType.Event,
			this.currentElement.campaign.campaignId,
		);

		events.filter((data: EventInterface) => data.date != null).forEach((event: EventInterface) => {
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
		const clues = this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<ClueInterface>(
			DataType.Clue,
			this.currentElement.campaign.campaignId
		);
		clues.filter((data: ClueInterface) => data.isFound === true).forEach((clue: ClueInterface) => {
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
		const characters = this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<CharacterInterface>(
			DataType.Character | DataType.NonPlayerCharacter,
			this.currentElement.campaign.campaignId,
		);
		characters.filter((data: CharacterInterface) => data.dob != null).forEach((character: CharacterInterface) => {
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
		const characters = this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<CharacterInterface>(
			DataType.Character | DataType.NonPlayerCharacter,
			this.currentElement.campaign.campaignId
		);
		characters.filter((data: CharacterInterface) => data.death != null).forEach((character: CharacterInterface) => {
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
		const sessions = this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<SessionInterface>(
			DataType.Session,
			this.currentElement.campaign.campaignId,
		);
		sessions.filter((data: SessionInterface) => data.date != null).forEach((session: SessionInterface) => {
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
