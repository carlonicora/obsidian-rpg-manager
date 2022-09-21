import {DataType} from "../enums/DataType";
import {TagValueInterface} from "../interfaces/TagValueInterface";
import {TagStatus} from "../enums/TagStatus";
import {App} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {IdInterface} from "../interfaces/data/IdInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";

export class Id extends AbstractRpgManager implements IdInterface{
	public tagMap: Map<DataType, TagValueInterface>;
	public tag: string;

	constructor(
		app: App,
		public type: DataType,
		campaignId: number,
		adventureId: number|undefined,
		sessionId: number|undefined,
		sceneId: number|undefined,
	) {
		super(app);

		this.tagMap = new Map();
		this.tagMap.set(DataType.Campaign, {status: TagStatus.Missing, value: campaignId});
		this.tagMap.set(DataType.Adventure, {status: TagStatus.NotRequired, value: adventureId});
		this.tagMap.set(DataType.Session, {status: TagStatus.NotRequired, value: sessionId});
		this.tagMap.set(DataType.Scene, {status: TagStatus.NotRequired, value: sceneId});
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
		const tagValue:TagValueInterface|undefined = this.tagMap.get(DataType.Adventure);

		if (tagValue !== undefined) tagValue.value = id;
	}

	private generateTagValue(
		type: DataType,
		value: string|undefined,
	): TagValueInterface {
		let status: TagStatus;
		let numericValue: number|undefined;

		if (value === '' || value === undefined){
			let isRequired = (type === DataType.Campaign);

			switch (this.type) {
				case DataType.Scene:
					if (type === DataType.Scene) isRequired = true;
				case DataType.Note:
				case DataType.Session:
					if (type === DataType.Session) isRequired = true;
				case DataType.Adventure:
					if (type === DataType.Adventure) isRequired = true;
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
		type: DataType,
	): boolean {
		return (this.tagMap.get(type)?.status === TagStatus.Valid || this.tagMap.get(type)?.status === TagStatus.NotRequired);
	}

	public get invalidIds(
	): Map<DataType, TagStatus>|undefined {
		const response: Map<DataType, TagStatus> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: DataType) => {
			if (tagValue.status === TagStatus.Invalid || tagValue.status === TagStatus.Missing) response.set(type, tagValue.status);
		});

		return (response.size === 0 ? undefined : response);
	}

	public get possiblyNotFoundIds(
	): Map<DataType, number>|undefined {
		const response: Map<DataType, number> = new Map();

		this.tagMap.forEach((tagValue: TagValueInterface, type: DataType) => {
			if (tagValue.value !== undefined) response.set(type, tagValue.value);
		});

		return (response.size === 0 ? undefined : response);
	}

	public getTypeValue(
		type: DataType,
	): number {
		const typeValue = this.tagMap.get(type);
		if (typeValue === undefined) throw new Error('Tag Type not found');

		if (typeValue.value === undefined) throw new TagMisconfiguredError(this.app, this);

		return typeValue.value;
	}
}
