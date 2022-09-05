import {DateTime} from "obsidian-dataview";
import {TimelineDataInterface} from "../../../interfaces/data/TimelineDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class TimelineData extends AbstractImageData implements TimelineDataInterface {
	synopsis: string;
	time: string;
	date: string;
	datetime: DateTime;


	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		public additionalInformation: string|null = '',
	) {
		super(data);

		this.image = RpgFunctions.getImage(data, 70);
		this.synopsis = data.synopsis;

		switch(this.additionalInformation){
			case 'event':
				this.datetime = data.dates.event;
				break;
			case 'death':
				this.datetime = data.dates.death;
				break
			case 'birth':
				this.datetime = data.dates.dob;
				break;
			case 'session':
				this.datetime = data.dates.session;
				break;
			case 'clue':
				this.datetime = data.dates.found;
				break;
		}

		this.date = RpgFunctions.formatDate(this.datetime, "short");
		this.time = RpgFunctions.formatTime(this.datetime);
	}
}
