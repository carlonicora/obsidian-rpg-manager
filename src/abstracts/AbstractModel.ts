import {Api} from "../Api";
import {ResponseData} from "../data/ResponseData";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {IoDataInterface} from "../interfaces/IoDataInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {Factory} from "../Factory";

export abstract class AbstractModel implements ModelInterface {
	protected data: ResponseDataInterface;
	protected io: IoDataInterface;

	constructor(
		protected api: Api,
		protected campaign: CampaignDataInterface,
		protected current: Record<string, any>,
		private dv: DataviewInlineApi,
		protected source: string,
	) {
		this.data = new ResponseData();
		this.io = Factory.createIoData(this.api, this.campaign, this.current, this.dv);
	}

	abstract generateData(
	): ResponseDataInterface;
}
