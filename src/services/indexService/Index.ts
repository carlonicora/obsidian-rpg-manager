import {ComponentType} from "../../core/enums/ComponentType";
import {IndexTagValueInterface} from "./interfaces/IndexTagValueInterface";
import {IndexTagStatus} from "./enums/IndexTagStatus";
import {TagMisconfiguredError} from "../../core/errors/TagMisconfiguredError";
import {IndexInterface} from "./interfaces/IndexInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {TagService} from "../tagService/TagService";

export class Index implements IndexInterface {
	public tagMap: Map<ComponentType, IndexTagValueInterface>;
	public campaignSettings: CampaignSetting = CampaignSetting.Agnostic;
	public positionInParent: number;

	constructor(
		private _api: RpgManagerApiInterface,
		public type: ComponentType,
		campaignId?: string,
		adventureId?: string,
		actId?: string,
		sceneId?: string,
		sessionId?: string,
		private _existingTag?: string,
	) {
		this.tagMap = new Map();

		this._generateTagValue(ComponentType.Campaign, campaignId);
		this._generateTagValue(ComponentType.Adventure, adventureId);
		this._generateTagValue(ComponentType.Act, actId);
		this._generateTagValue(ComponentType.Scene, sceneId);
		this._generateTagValue(ComponentType.Session, sessionId);
	}

	get stringID(
	): string{
		let response = this.type + '-' + this.campaignSettings + '-' + this.campaignId;

		if (this.type === ComponentType.Session){
			response += '/' + this.sessionId;
		} else if (this.type === ComponentType.Adventure || this.type === ComponentType.Act || this.type === ComponentType.Scene){
			response += '/' + this.adventureId;
			if (this.type === ComponentType.Act || this.type === ComponentType.Scene) {
				response += '/' + this.actId;
				if (this.type == ComponentType.Scene){
					response += '/' + this.sceneId;
				}
			}
		}

		return response;
	}

	public get id(
	): string {
		const response:string|undefined = this.tagMap.get(this.type)?.value;
		if (response === undefined) throw new Error('');

		return response;
	}

	public set id(
		id: string,
	) {
		const tagValue:IndexTagValueInterface|undefined = this.tagMap.get(this.type);

		if (tagValue !== undefined) {
			tagValue.value = id;
			tagValue.status = IndexTagStatus.Valid;
		}
	}

	public get tag(
	): string {
		if (this._existingTag !== undefined) return this._existingTag;

		const tag = this._api.service(TagService).dataSettings.get(this.type);
		if (tag === undefined) throw new Error('');

		let ids = '';
		let id:string|undefined;
		switch (this.type){
			case ComponentType.Scene:
				id = this.tagMap.get(ComponentType.Scene)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			case ComponentType.Act:
				id = this.tagMap.get(ComponentType.Act)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			case ComponentType.Adventure:
			case ComponentType.Session:
				id = this.tagMap.get(this.type === ComponentType.Session ? ComponentType.Session : ComponentType.Adventure)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			default:
				id = this.tagMap.get(ComponentType.Campaign)?.value;
				if (id !== undefined) ids = '/' + id + ids;
				break;
		}

		return tag + ids;
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

	get stringValue(
	): string {
		let response = '';

		switch(this.type){
			case ComponentType.Scene:
				response = '/' + (this.tagMap.get(ComponentType.Scene)?.value ?? '');
			case ComponentType.Act:
				response = '/' + (this.tagMap.get(ComponentType.Act)?.value ?? '') + response;
			case ComponentType.Adventure:
				response = '/' + (this.tagMap.get(ComponentType.Adventure)?.value ?? '') + response;
				break;
			case ComponentType.Session:
				response = '/' + (this.tagMap.get(ComponentType.Session)?.value ?? '') + response;
				break;
		}

		response = this.type + '/' + (this.tagMap.get(ComponentType.Campaign)?.value ?? '') + response;

		return response;
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
