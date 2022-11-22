import {ComponentType} from "../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./interfaces/IndexTagValueInterface";
import {IndexInterface} from "./interfaces/IndexInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class Index implements IndexInterface {
	public tagMap: Map<ComponentType, IndexTagValueInterface>;
	public campaignSettings: CampaignSetting = CampaignSetting.Agnostic;
	public positionInParent: number;
	private _parentPosition: number;

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

		try {
			const parent = this._api.database.readById(this._parentId);
			this._parentPosition = parent.index.positionInParent;
		} catch (e) {
			this._parentPosition = 1;
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
		return this._parentPosition;
	}
}
