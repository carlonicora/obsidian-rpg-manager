import {RecordType} from "../enums/RecordType";
import {TagValueInterface} from "../interfaces/TagValueInterface";
import {TagStatus} from "../enums/TagStatus";
import {App} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {IdInterface} from "../interfaces/data/IdInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";

export class Id extends AbstractRpgManager implements IdInterface{
	public tagMap: Map<RecordType, TagValueInterface>;

	constructor(
		app: App,
		public type: RecordType,
		campaignId: number,
		adventureId: number|undefined,
		sessionId: number|undefined,
		sceneId: number|undefined,
	) {
		super(app);

		this.tagMap = new Map();
		this.tagMap.set(
			RecordType.Campaign,
			{
				status: campaignId !== undefined ? TagStatus.Valid : TagStatus.Missing,
				value: campaignId,
			}
		);
		this.tagMap.set(
			RecordType.Adventure,
			{
				status: adventureId !== undefined ? TagStatus.Valid : TagStatus.NotRequired,
				value: adventureId,
			}
		);
		this.tagMap.set(
			RecordType.Session,
			{
				status: sessionId !== undefined ? TagStatus.Valid : TagStatus.NotRequired,
				value: sessionId,
			}
		);
		this.tagMap.set(
			RecordType.Scene,
			{
				status: sceneId !== undefined ? TagStatus.Valid : TagStatus.NotRequired,
				value: sceneId,
			}
		);
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
		const tagValue:TagValueInterface|undefined = this.tagMap.get(RecordType.Adventure);

		if (tagValue !== undefined) tagValue.value = id;
	}

	public get tag(
	): string {
		const tag = this.tagHelper.dataSettings.get(this.type);
		if (tag === undefined) throw new Error('');

		let ids = '';
		switch (this.type){
			case RecordType.Scene:
				ids = '/' + this.sceneId + ids;
			case RecordType.Note:
			case RecordType.Session:
				ids = '/' + this.sessionId + ids;
			case RecordType.Adventure:
				ids = '/' + this.adventureId + ids;
			default:
				ids = '/' + this.campaignId + ids;
				break;
		}

		return tag + ids;
	}

	get campaignId(
	): number {
		let response = this.getTypeValue(RecordType.Campaign);

		if (response === undefined) throw new TagMisconfiguredError(this.app, this);

		return response;
	}

	get adventureId(
	): number|undefined {
		return this.getTypeValue(RecordType.Adventure);
	}

	get sessionId(
	): number|undefined {
		return this.getTypeValue(RecordType.Session);
	}

	get sceneId(
	): number|undefined {
		return this.getTypeValue(RecordType.Scene);
	}

	private generateTagValue(
		type: RecordType,
		value: string|undefined,
	): TagValueInterface {
		let status: TagStatus;
		let numericValue: number|undefined;

		if (value === '' || value === undefined){
			let isRequired = (type === RecordType.Campaign);

			switch (this.type) {
				case RecordType.Scene:
					if (type === RecordType.Scene) isRequired = true;
				case RecordType.Note:
				case RecordType.Session:
					if (type === RecordType.Session) isRequired = true;
				case RecordType.Adventure:
					if (type === RecordType.Adventure) isRequired = true;
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

		return {status: status, value: numericValue};
	}

	public get isValid(
	): boolean {
		let response = true;

		this.tagMap.forEach((tagValue: TagValueInterface) => {
			if (tagValue.status === TagStatus.Invalid || tagValue.status === TagStatus.Missing) response = false;
		});

		return response;
	}

	public isTypeValid(
		type: RecordType,
	): boolean {
		return (this.tagMap.get(type)?.status === TagStatus.Valid || this.tagMap.get(type)?.status === TagStatus.NotRequired);
	}

	public get invalidIds(
	): Map<RecordType, TagStatus>|undefined {
		const response: Map<RecordType, TagStatus> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: RecordType) => {
			if (tagValue.status === TagStatus.Invalid || tagValue.status === TagStatus.Missing) response.set(type, tagValue.status);
		});

		return (response.size === 0 ? undefined : response);
	}

	public get possiblyNotFoundIds(
	): Map<RecordType, number>|undefined {
		const response: Map<RecordType, number> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: RecordType) => {
			if (tagValue.value !== undefined) response.set(type, tagValue.value);
		});

		return (response.size === 0 ? undefined : response);
	}

	public getTypeValue(
		type: RecordType,
	): number|undefined {
		const typeValue = this.tagMap.get(type);
		if (typeValue === undefined) throw new Error('Tag Type not found');

		if (typeValue.status === TagStatus.Valid) return typeValue.value;
		if (typeValue.status === TagStatus.NotRequired) return undefined;

		throw new TagMisconfiguredError(this.app, this);
	}
}
