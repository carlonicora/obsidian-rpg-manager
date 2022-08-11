import {
	GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface,
} from "../interfaces/DataInterfaces";
import {DateTime} from "obsidian-dataview";
import {RpgFunctions} from "./functions/RpgFunctions";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface TimelineListInterface extends GenericDataListInterface{
	elements: TimelineDataInterface[];
}

export interface TimelineDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	time: DateTime;
	type: string;

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
			return a.time - b.time;
		});
	}
}

export class TimelineData extends AbstractImageData implements TimelineDataInterface {
	synopsis: string;
	time: DateTime;

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		public type: string,
	) {
		super(functions, data);

		this.image = functions.getImage(data, 70);
		this.synopsis = data.synopsis;

		switch(data.file.tags[0]){
			case 'event':
				this.time = data.dates.event;
				break;
		}
	}

	getEventColour(
	): string {
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
			case 'clue':
				return ' purple';
				break;
		}

		return '';
	}
}
