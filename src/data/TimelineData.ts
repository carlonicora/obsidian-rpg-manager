import {
	GenericDataListInterface, GenericImageDataInterface,
} from "../interfaces/DataInterfaces";
import {DateTime} from "obsidian-dataview";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface TimelineListInterface extends GenericDataListInterface{
	elements: TimelineDataInterface[];
}

export interface TimelineDataInterface extends GenericImageDataInterface {
	synopsis: string;
	time: string;
	date: string;
	type: string;
	datetime: DateTime;

	getEventColour(): string;
}


export class TimelineList extends AbstractDataList implements TimelineListInterface {
	public elements: TimelineDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}

	sort(){
		this.elements.sort((a,b) => {
			return a.datetime - b.datetime;
		});
	}
}

export class TimelineData extends AbstractImageData implements TimelineDataInterface {
	synopsis: string;
	time: string;
	date: string;
	datetime: DateTime;

	constructor(
		api: Api,
		data: Record<string, any>,
		public type: string,
	) {
		super(api, data);

		this.image = this.api.getImage(data, 70);
		this.synopsis = data.synopsis;

		switch(type){
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

		this.date = this.api.formatDate(this.datetime, "short");
		this.time = this.api.formatTime(this.datetime);
	}

	getEventColour(
	): string {
		switch (this.type){
			case 'event':
				return '';
				break;
			case 'birth':
				return 'green';
				break;
			case 'death':
				return 'red';
				break;
			case 'session':
				return 'blue';
				break;
			case 'clue':
				return 'purple';
				break;
		}

		return '';
	}
}
