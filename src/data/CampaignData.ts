import {GenericDataInterface, GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractImageData} from "../abstracts/AbstractData";
import {DataType} from "../io/IoData";

export interface CampaignDataInterface extends GenericDataInterface, GenericImageDataInterface {
	id: number;
	currentDate: string;
}

export class CampaignData extends AbstractImageData implements CampaignDataInterface {
	public id: number;
	public currentDate: string;

	public static frontmatter = {
		'dates': {
			'current': true,
		},
	};

	constructor(
		api: Api,
		data: Record<string, any>,
	) {
		super(api, data);
		this.currentDate = data.dates.current;

		this.id = this.api.getTagId(data.tags, DataType.Campaign);
	}
}
