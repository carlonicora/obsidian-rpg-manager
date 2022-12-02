import {ComponentType} from "../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./interfaces/IndexTagValueInterface";
import {IndexInterface} from "./interfaces/IndexInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {Md5} from "ts-md5";

export class Index implements IndexInterface {
	public tagMap: Map<ComponentType, IndexTagValueInterface>;
	public campaignSettings: CampaignSetting = CampaignSetting.Agnostic;
	public positionInParent: number;
	private _parentPosition: number|undefined = undefined;

	constructor(
		private _api: RpgManagerApiInterface,
		public type: ComponentType,
		private _id: string,
		private _campaignId: string,
		private _parentId: string,
	) {
		this.tagMap = new Map();
		this.positionInParent = 1;

		if (type === ComponentType.Campaign) {
			this._campaignId = this._id;
			this._parentId = this._id;
		}
	}

	public get id(
	): string {
		return this._id;
	}

	get campaignId(
	): string {
		return this._campaignId;
	}

	get parentId(
	): string {
		return this._parentId;
	}

	get parentPosition(
	): number {
		if (this._parentPosition === undefined) {
			try {
				const parent = this._api.database.readById(this._parentId);
				this._parentPosition = parent.index.positionInParent;
			} catch (e) {
				this._parentPosition = 1;
			}
		}

		return this._parentPosition;
	}

	get checksum(
	): string|Int32Array|undefined {
		const md5 = new Md5();
		md5.appendStr(this._id);
		md5.appendStr(this._campaignId);
		md5.appendStr(this._parentId);
		md5.appendStr(this.positionInParent.toString());
		md5.appendStr(this.campaignSettings.toString());
		md5.appendStr(this.type.toString());

		const response = md5.end();

		return response;
	}
}
