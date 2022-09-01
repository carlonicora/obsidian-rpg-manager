import {ViewInterface} from "./interfaces/ViewInterface";
import {Pronoun} from "./enums/Pronoun";
import {Api} from "./Api";
import {CampaignDataInterface} from "./interfaces/data/CampaignDataInterface";
import {AbstractModel} from "./abstracts/AbstractModel";
import {DataType} from "./enums/DataType";
import {DataObject} from "obsidian-dataview";
import {GenericDataInterface} from "./interfaces/data/GenericDataInterface";
import {CampaignSetting} from "./enums/CampaignSetting";
import {ContentType} from "./enums/ContentType";
import {ContentInterface} from "./interfaces/content/ContentInterface";
import {StringContent} from "./data/content/StringContent";
import {LinkContent} from "./data/content/LinkContent";
import {NumberContent} from "./data/content/NumberContent";
import {ObjectContent} from "./data/content/ObjectContent";
import {MarkdownContent} from "./data/content/MarkdownContent";
import {ImageContent} from "./data/content/ImageContent";
import {ResponseType} from "./enums/ResponseType";
import * as AgnosticModel from "./settings/Agnostic/models";
import * as AgnosticData from "./settings/Agnostic/data";
import * as AgnosticView from './settings/Agnostic/views';
import * as AgnosticIoData from "./settings/Agnostic/io/IoData"
import * as RawData from "./settings/Raw/data";
import * as VampireData from "./settings/Vampire/data";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {IoDataInterface} from "./interfaces/IoDataInterface";

export class Factory {
	static dataFunctions: { [K: string]: Function } = {
		//RawCharacterData: RawData.RawCharacterData,
		//VampireCharacterData: VampireData.VampireCharacterData,
	};

	private static instantiateClass(
		campaignSettings: CampaignSetting,
		type: string,
		className: string,
		parameters: Array<any>,
	): any {
		if (Factory.dataFunctions[CampaignSetting[campaignSettings] + className + type]) {
			//@ts-ignore
			return new Factory().dataFunctions[CampaignSetting[campaignSettings] + className](...parameters);
		} else {
			switch (type) {
				case 'View':
					//@ts-ignore
					return new AgnosticView[className + type](...parameters);
					break;
				case 'Model':
					//@ts-ignore
					return new AgnosticModel[className + type](...parameters);
					break;
				case 'Data':
					//@ts-ignore
					return new AgnosticData[className + type](...parameters);
					break;
				case 'IoData':
					//@ts-ignore
					return new AgnosticIoData[className + type](...parameters);
					break;
			}
		}
	}

	public static createView(
		campaign: CampaignDataInterface,
		responseType: ResponseType,
		sourcePath: string,
	): ViewInterface {
		return Factory.instantiateClass(
			campaign.settings,
			'View',
			ResponseType[responseType],
			[
				sourcePath,
			],
		);
	}

	public static createModel(
		api: Api,
		campaign: CampaignDataInterface,
		dv: DataviewInlineApi,
		current: Record<string, any>,
		source: string,
	): AbstractModel
	{
		let modelName = source.replace(/[\n\r]/g, '').toLowerCase();
		modelName = modelName[0].toUpperCase() + modelName.substring(1);
		modelName = modelName.replace('navigation', 'Navigation');

		return Factory.instantiateClass(
			campaign.settings,
			'Model',
			modelName,
			[
				api,
				campaign,
				current,
				dv,
				source,
			],
		);
	}

	public static createContent(
		content: any,
		type: ContentType,
		isInline = false,
	): ContentInterface {
		switch (type) {
			case ContentType.String:
				return new StringContent(content, isInline);
				break;
			case ContentType.Link:
				return new LinkContent(content, isInline);
				break;
			case ContentType.Number:
				return new NumberContent(content, isInline);
				break;
			case ContentType.Object:
				return new ObjectContent(content, isInline);
				break;
			case ContentType.Markdown:
				return new MarkdownContent(content, isInline);
				break;
			case ContentType.Image:
				return new ImageContent(content, isInline);
				break;
		}
	}

	public static createData(
		type: DataType,
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		record: DataObject,
		additionalInformation: string|null,
	): GenericDataInterface
	{
		return Factory.instantiateClass(
			campaign.settings,
			'Data',
			DataType[type],
			[
				api,
				record,
				campaign,
				additionalInformation,
			],
		);
	}

	public static createIoData(
		api: Api,
		campaign: CampaignDataInterface,
		current: Record<string, any>,
		dv: DataviewInlineApi,

	): IoDataInterface {
		return Factory.instantiateClass(
			campaign.settings,
			'IoData',
			'',
			[
				api,
				campaign,
				dv,
				current,
			],
		);
	}

	public static createError(
		errorMessage: string,
	): void {
		console.log('RpgManager Error: ' + errorMessage);
	}

	public static createPronoun(
		pronoun: string|null,
	): Pronoun|null {

		let response: Pronoun|null = null;

		if (pronoun != null) {
			switch(pronoun.toLowerCase()) {
				case 't':
				case 'they':
					response = Pronoun.they;
					break;
				case 's':
				case 'she':
					response = Pronoun.she;
					break;
				case 'h':
				case 'he':
					response = Pronoun.he;
					break;
				default:
					response = null;
					break;
			}
		}

		return response;
	}

	public static readPronoun(
		pronoun: Pronoun
	): string {
		switch (pronoun) {
			case Pronoun.they:
				return 'They/Them';
				break;
			case Pronoun.she:
				return 'She/Her';
				break;
			case Pronoun.he:
				return 'He/Him';
				break;
		}
	}
}
