import {ComponentType} from "../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./interfaces/IndexTagValueInterface";
import {IndexTagStatus} from "./enums/IndexTagStatus";
import {TagMisconfiguredError} from "../../core/errors/TagMisconfiguredError";
import {IndexInterface} from "./interfaces/IndexInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class Index implements IndexInterface {
	public tagMap: Map<ComponentType, IndexTagValueInterface>;
	public campaignSettings: CampaignSetting = CampaignSetting.Agnostic;
	public positionInParent: number;

	constructor(
		private _api: RpgManagerApiInterface,
		public type: ComponentType,
		private _id: string,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
	) {
		this.tagMap = new Map();
		this.positionInParent = 1;

		this._generateTagValue(ComponentType.Campaign, (type === ComponentType.Campaign ? _id : campaignId));
		this._generateTagValue(ComponentType.Adventure, (type === ComponentType.Adventure ? _id : adventureId));
		this._generateTagValue(ComponentType.Act, (type === ComponentType.Act ? _id : actId));
		this._generateTagValue(ComponentType.Scene, (type === ComponentType.Scene ? _id : sceneId));
		this._generateTagValue(ComponentType.Session, (type === ComponentType.Session ? _id : sessionId));
	}

	public get id(
	): string {
		return this._id;
	}

	public set id(
		id: string,
	) {
		this._id = id;
	}

	get campaignId(
	): string {
		const response = this.getTypeValue(ComponentType.Campaign);

		if (response === undefined) throw new TagMisconfiguredError(this._api, this);

		return response;
	}

	get adventureId(
	): string|undefined {
		return this.getTypeValue(ComponentType.Adventure);
	}

	get actId(
	): string|undefined {
		return this.getTypeValue(ComponentType.Act);
	}

	get sceneId(
	): string|undefined {
		return this.getTypeValue(ComponentType.Scene);
	}

	get sessionId(
	): string|undefined {
		return this.getTypeValue(ComponentType.Session);
	}

	private _generateTagValue(
		type: ComponentType,
		value: string|undefined,
	): void {
		let status: IndexTagStatus;

		if (value === '' || value === undefined){
			let isRequired = (type === ComponentType.Campaign);

			switch (this.type) {
				case ComponentType.Scene:
					if (type === ComponentType.Scene) isRequired = true;
				case ComponentType.Act:
					if (type === ComponentType.Act) isRequired = true;
				case ComponentType.Adventure:
					if (type === ComponentType.Adventure) isRequired = true;
					break;
				case ComponentType.Session:
					if (type === ComponentType.Session) isRequired = true;
			}

			status = isRequired ? IndexTagStatus.Missing : IndexTagStatus.NotRequired;
		} else {
			status = IndexTagStatus.Valid;
		}

		this.tagMap.set(type, {status: status, value: value});
	}

	public get isValid(
	): boolean {
		let response = true;

		this.tagMap.forEach((tagValue: IndexTagValueInterface, componentType:ComponentType) => {
			if (tagValue.status === IndexTagStatus.Invalid || tagValue.status === IndexTagStatus.Missing) response = false;
		});

		return response;
	}

	public isTypeValid(
		type: ComponentType,
	): boolean {
		return (this.tagMap.get(type)?.status === IndexTagStatus.Valid || this.tagMap.get(type)?.status === IndexTagStatus.NotRequired);
	}

	public get invalidIds(
	): Map<ComponentType, IndexTagStatus>|undefined {
		const response: Map<ComponentType, IndexTagStatus> = new Map();

		this.tagMap.forEach((tagValue: IndexTagValueInterface, type: ComponentType) => {
			if (tagValue.status === IndexTagStatus.Invalid || tagValue.status === IndexTagStatus.Missing) response.set(type, tagValue.status);
		});

		return (response.size === 0 ? undefined : response);
	}

	public get possiblyNotFoundIds(
	): Map<ComponentType, string>|undefined {
		const response: Map<ComponentType, string> = new Map();

		this.tagMap.forEach((tagValue: IndexTagValueInterface, type: ComponentType) => {
			if (tagValue.value !== undefined) response.set(type, tagValue.value);
		});

		return (response.size === 0 ? undefined : response);
	}

	public getTypeValue(
		type: ComponentType,
	): string|undefined {
		const typeValue = this.tagMap.get(type);
		if (typeValue === undefined) throw new Error('Tag Type not found');

		if (typeValue.status === IndexTagStatus.Valid) return typeValue.value;
		if (typeValue.status === IndexTagStatus.NotRequired) return undefined;

		throw new TagMisconfiguredError(this._api, this);
	}

	public replaceId(
		type: ComponentType,
		id: string,
	): void {
		const idValue = this.tagMap.get(type);
		if (idValue !== undefined)
			idValue.value = id;

	}
}
