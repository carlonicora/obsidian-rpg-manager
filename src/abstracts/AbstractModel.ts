import {ResponseData} from "../data/ResponseData";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {IoFactory, SingleIoKey} from "../factories/Iofactory";
import {App} from "obsidian";

export abstract class AbstractModel implements ModelInterface {
	protected data: ResponseDataInterface;
	protected io: IoInterface;

	constructor(
		protected app: App,
		protected campaign: CampaignDataInterface,
		protected current: Record<string, any>,
		private dv: DataviewInlineApi,
		protected source: string,
	) {
		this.data = new ResponseData();

		const ioName:SingleIoKey<any> = this.campaign.settings + 'Io';
		this.io = IoFactory.create(ioName, this.app, this.campaign, this.dv, this.current);
	}

	abstract generateData(
	): ResponseDataInterface;
}
