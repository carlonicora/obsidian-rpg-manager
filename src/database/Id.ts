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
		campaignId: string|undefined,
		adventureId: string|undefined,
		actId: string|undefined,
		sceneId: string|undefined,
		sessionId: string|undefined,
		private existingTag: string|undefined,
	) {
		super(app);

		this.tagMap = new Map();

		this.generateTagValue(RecordType.Campaign, campaignId);
		this.generateTagValue(RecordType.Adventure, adventureId);
		this.generateTagValue(RecordType.Act, actId);
		this.generateTagValue(RecordType.Scene, sceneId);
		this.generateTagValue(RecordType.Session, sessionId);
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
		if (this.existingTag !== undefined) return this.existingTag;

		const tag = this.tagHelper.dataSettings.get(this.type);
		if (tag === undefined) throw new Error('');

		let ids = '';
		let id:number|undefined;
		switch (this.type){
			case RecordType.Scene:
				id = this.tagMap.get(RecordType.Scene)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			case RecordType.Act:
				id = this.tagMap.get(RecordType.Act)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			case RecordType.Adventure:
			case RecordType.Session:
				id = this.tagMap.get(this.type === RecordType.Session ? RecordType.Session : RecordType.Adventure)?.value;
				if (id !== undefined) ids = '/' + id + ids;
			default:
				id = this.tagMap.get(RecordType.Campaign)?.value;
				if (id !== undefined) ids = '/' + id + ids;
				break;
		}

		return tag + ids;
	}

	get campaignId(
	): number {
		const response = this.getTypeValue(RecordType.Campaign);

		if (response === undefined) throw new TagMisconfiguredError(this.app, this);

		return response;
	}

	get adventureId(
	): number|undefined {
		return this.getTypeValue(RecordType.Adventure);
	}

	get actId(
	): number|undefined {
		return this.getTypeValue(RecordType.Act);
	}

	get sceneId(
	): number|undefined {
		return this.getTypeValue(RecordType.Scene);
	}

	get sessionId(
	): number|undefined {
		return this.getTypeValue(RecordType.Session);
	}

	private generateTagValue(
		type: RecordType,
		value: string|undefined,
	): void {
		let status: TagStatus;
		let numericValue: number|undefined;

		if (value === '' || value === undefined){
			let isRequired = (type === RecordType.Campaign);

			switch (this.type) {
				case RecordType.Scene:
					if (type === RecordType.Scene) isRequired = true;
				case RecordType.Act:
					if (type === RecordType.Act) isRequired = true;
				case RecordType.Adventure:
					if (type === RecordType.Adventure) isRequired = true;
					break;
				case RecordType.Session:
					if (type === RecordType.Session) isRequired = true;
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

		this.tagMap.forEach((tagValue: TagValueInterface, recordType:RecordType) => {
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
