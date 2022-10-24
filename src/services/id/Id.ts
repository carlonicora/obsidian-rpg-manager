import {ComponentType} from "../../core/enums/ComponentType";
import {TagValueInterface} from "./interfaces/TagValueInterface";
import {TagStatus} from "./enums/TagStatus";
import {App} from "obsidian";
import {TagMisconfiguredError} from "../../core/errors/TagMisconfiguredError";
import {IdInterface} from "./interfaces/IdInterface";
import {AbstractRpgManager} from "../../core/abstracts/AbstractRpgManager";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";

export class Id extends AbstractRpgManager implements IdInterface{
	public tagMap: Map<ComponentType, TagValueInterface>;
	public campaignSettings: CampaignSetting = CampaignSetting.Agnostic;

	constructor(
		app: App,
		public type: ComponentType,
		campaignId: string|undefined,
		adventureId: string|undefined,
		actId: string|undefined,
		sceneId: string|undefined,
		sessionId: string|undefined,
		private _existingTag: string|undefined,
	) {
		super(app);

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
	): number {
		const response:number|undefined = this.tagMap.get(this.type)?.value;
		if (response === undefined) throw new Error('');

		return response;
	}

	public set id(
		id: number,
	) {
		const tagValue:TagValueInterface|undefined = this.tagMap.get(this.type);

		if (tagValue !== undefined) {
			tagValue.value = id;
			tagValue.status = TagStatus.Valid;
		}
	}

	public get tag(
	): string {
		if (this._existingTag !== undefined) return this._existingTag;

		const tag = this.tagHelper.dataSettings.get(this.type);
		if (tag === undefined) throw new Error('');

		let ids = '';
		let id:number|undefined;
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
	): number {
		const response = this.getTypeValue(ComponentType.Campaign);

		if (response === undefined) throw new TagMisconfiguredError(this.app, this);

		return response;
	}

	get adventureId(
	): number|undefined {
		return this.getTypeValue(ComponentType.Adventure);
	}

	get actId(
	): number|undefined {
		return this.getTypeValue(ComponentType.Act);
	}

	get sceneId(
	): number|undefined {
		return this.getTypeValue(ComponentType.Scene);
	}

	get sessionId(
	): number|undefined {
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
		let status: TagStatus;
		let numericValue: number|undefined;

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

			status = isRequired ? TagStatus.Missing : TagStatus.NotRequired;
		} else {
			if (isNaN(+value)){
				status = TagStatus.Invalid;
			} else {
				status = TagStatus.Valid;
				numericValue = +value;
			}
		}

		this.tagMap.set(type, {status: status, value: numericValue})
	}

	public get isValid(
	): boolean {
		let response = true;

		this.tagMap.forEach((tagValue: TagValueInterface, componentType:ComponentType) => {
			if (tagValue.status === TagStatus.Invalid || tagValue.status === TagStatus.Missing) response = false;
		});

		return response;
	}

	public isTypeValid(
		type: ComponentType,
	): boolean {
		return (this.tagMap.get(type)?.status === TagStatus.Valid || this.tagMap.get(type)?.status === TagStatus.NotRequired);
	}

	public get invalidIds(
	): Map<ComponentType, TagStatus>|undefined {
		const response: Map<ComponentType, TagStatus> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: ComponentType) => {
			if (tagValue.status === TagStatus.Invalid || tagValue.status === TagStatus.Missing) response.set(type, tagValue.status);
		});

		return (response.size === 0 ? undefined : response);
	}

	public get possiblyNotFoundIds(
	): Map<ComponentType, number>|undefined {
		const response: Map<ComponentType, number> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: ComponentType) => {
			if (tagValue.value !== undefined) response.set(type, tagValue.value);
		});

		return (response.size === 0 ? undefined : response);
	}

	public getTypeValue(
		type: ComponentType,
	): number|undefined {
		const typeValue = this.tagMap.get(type);
		if (typeValue === undefined) throw new Error('Tag Type not found');

		if (typeValue.status === TagStatus.Valid) return typeValue.value;
		if (typeValue.status === TagStatus.NotRequired) return undefined;

		throw new TagMisconfiguredError(this.app, this);
	}
}
