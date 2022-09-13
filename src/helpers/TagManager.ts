import {App} from "obsidian";
import {DataType} from "../enums/DataType";
import {TagMisconfigured} from "../errors/TagMisconfigured";

export class TagManager {
	public dataSettings: Map<DataType, string>;
	private requiredIds: Map<DataType, Array<DataType>>;

	constructor(
		private app: App,
	) {
		const settings = this.app.plugins.getPlugin('rpg-manager').settings;
		this.dataSettings = new Map();
		this.dataSettings.set(DataType.Campaign, settings.campaignTag);
		this.dataSettings.set(DataType.Adventure, settings.adventureTag);
		this.dataSettings.set(DataType.Session, settings.sessionTag);
		this.dataSettings.set(DataType.Scene, settings.sceneTag);
		this.dataSettings.set(DataType.Character, settings.pcTag);
		this.dataSettings.set(DataType.Clue, settings.clueTag);
		this.dataSettings.set(DataType.Event, settings.eventTag);
		this.dataSettings.set(DataType.Faction, settings.factionTag);
		this.dataSettings.set(DataType.Location, settings.locationTag);
		this.dataSettings.set(DataType.NonPlayerCharacter, settings.npcTag);
		this.dataSettings.set(DataType.Note, settings.noteTag);
		this.dataSettings.set(DataType.Timeline, settings.timelineTag);
		this.dataSettings.set(DataType.Music, settings.musicTag);

		this.requiredIds = new Map();
		this.requiredIds.set(DataType.Campaign, [DataType.Campaign]);
		this.requiredIds.set(DataType.Adventure, [DataType.Campaign]);
		this.requiredIds.set(DataType.Session, [DataType.Campaign, DataType.Adventure]);
		this.requiredIds.set(DataType.Scene, [DataType.Campaign, DataType.Adventure, DataType.Session, DataType.Scene]);
		this.requiredIds.set(DataType.Character, [DataType.Campaign]);
		this.requiredIds.set(DataType.Clue, [DataType.Campaign]);
		this.requiredIds.set(DataType.Event, [DataType.Campaign]);
		this.requiredIds.set(DataType.Faction, [DataType.Campaign]);
		this.requiredIds.set(DataType.Location, [DataType.Campaign]);
		this.requiredIds.set(DataType.NonPlayerCharacter, [DataType.Campaign]);
		this.requiredIds.set(DataType.Note, [DataType.Campaign, DataType.Adventure, DataType.Session]);
		this.requiredIds.set(DataType.Timeline, [DataType.Campaign]);
		this.requiredIds.set(DataType.Music, [DataType.Music]);
	}

	public sanitiseTags(
		tags: string|Array<string>|undefined,
	): Array<string> {
		if (tags === undefined) return [];

		let response: Array<string>;
		if (typeof tags === 'string'){
			response = tags.split(',');
			response.forEach((tag: string) => {
				tag = tag.replaceAll(' ', '').replaceAll('#', '');
			});
		} else {
			response = tags;
		}

		return response;
	}

	public getTemplateDataType(
		tags: Array<string>|null,
	): DataType|undefined {
		if (tags == null) return undefined;

		let response: DataType|undefined;
		tags.forEach((tag: string) => {
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Campaign].toLowerCase())) response = DataType.Campaign;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Adventure].toLowerCase())) response = DataType.Adventure;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Session].toLowerCase())) response = DataType.Session;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Scene].toLowerCase())) response = DataType.Scene;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.NonPlayerCharacter].toLowerCase())) response = DataType.NonPlayerCharacter;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Character].toLowerCase())) response = DataType.Character;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Clue].toLowerCase())) response = DataType.Clue;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Location].toLowerCase())) response = DataType.Location;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Faction].toLowerCase())) response = DataType.Faction;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Event].toLowerCase())) response = DataType.Event;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Timeline].toLowerCase())) response = DataType.Timeline;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Note].toLowerCase())) response = DataType.Note;
			if (tag.startsWith('rpgm/template/' + DataType[DataType.Music].toLowerCase())) response = DataType.Music;
		});

		return response;
	}
	
	public getDataTag(
		tags: Array<string>|null,
	): string|undefined {
		if (tags == null) return undefined;

		let response: string|undefined;

		if (typeof tags === 'object') {
			tags.forEach((tag: string) => {

				if (tag !== null && typeof tag === 'string') {
					if (tag.startsWith(this.dataSettings.get(DataType.Campaign) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Adventure) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Session) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Scene) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.NonPlayerCharacter) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Character) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Clue) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Location) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Faction) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Event) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Timeline) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Note) ?? '?')) response = tag;
					if (tag.startsWith(this.dataSettings.get(DataType.Music) ?? '?')) response = tag;
				}
			});
		}

		return response;
	}

	public getDataType(
		tags: Array<string>|undefined=undefined,
		tag: string|undefined=undefined,
	): DataType|undefined {
		if (tag === undefined && tags === undefined) return undefined;

		if (tags !== undefined) tag = this.getDataTag(tags);

		if (tag === undefined) return undefined;
		
		let response: DataType|undefined;

		if (tag.startsWith(this.dataSettings.get(DataType.Campaign) ?? '?')) response = DataType.Campaign;
		if (tag.startsWith(this.dataSettings.get(DataType.Adventure) ?? '?')) response = DataType.Adventure;
		if (tag.startsWith(this.dataSettings.get(DataType.Session) ?? '?')) response = DataType.Session;
		if (tag.startsWith(this.dataSettings.get(DataType.Scene) ?? '?')) response = DataType.Scene;
		if (tag.startsWith(this.dataSettings.get(DataType.NonPlayerCharacter) ?? '?')) response = DataType.NonPlayerCharacter;
		if (tag.startsWith(this.dataSettings.get(DataType.Character) ?? '?')) response = DataType.Character;
		if (tag.startsWith(this.dataSettings.get(DataType.Clue) ?? '?')) response = DataType.Clue;
		if (tag.startsWith(this.dataSettings.get(DataType.Location) ?? '?')) response = DataType.Location;
		if (tag.startsWith(this.dataSettings.get(DataType.Faction) ?? '?')) response = DataType.Faction;
		if (tag.startsWith(this.dataSettings.get(DataType.Event) ?? '?')) response = DataType.Event;
		if (tag.startsWith(this.dataSettings.get(DataType.Timeline) ?? '?')) response = DataType.Timeline;
		if (tag.startsWith(this.dataSettings.get(DataType.Note) ?? '?')) response = DataType.Note;
		if (tag.startsWith(this.dataSettings.get(DataType.Music) ?? '?')) response = DataType.Music;

		return response;
	}

	public getId(
		type: DataType,
		tag: string|undefined = undefined,
		tags: Array<string>|undefined = undefined,
	): number {
		if (tags === undefined && tag === undefined) throw new Error('Either a tag or a list of tags should be defined');

		if (tags !== undefined) tag = this.getDataTag(tags);
		if (tag === undefined) throw new Error('The tags do not contain a valid RPG Manager outline or element tag');

		const dataType = this.getDataType(undefined, tag);
		if (dataType === undefined) throw new Error('The tags do not contain a valid RPG Manager outline or element tag');

		const dataSettingsTag = this.dataSettings.get(dataType);
		if (dataSettingsTag === undefined) throw new Error('The tags do not contain a valid RPG Manager outline or element tag');

		const ids: Array<number> = tag.substring(dataSettingsTag.length + 1).split('/').map(Number);

		const variables: Map<DataType, number|null> = new Map();
		if (!isNaN(ids[0])) variables.set(DataType.Campaign, ids[0]);
		switch (dataType) {
			case DataType.Scene:
				if (!isNaN(ids[3])) variables.set(DataType.Scene, ids[3]);
			case DataType.Session:
			case DataType.Note:
				if (!isNaN(ids[2])) variables.set(DataType.Session, ids[2]);
			case DataType.Adventure:
				if (!isNaN(ids[1])) variables.set(DataType.Adventure, ids[1]);
				break;
		}

		const response = variables.get(type);

		if (response == null){
			throw new TagMisconfigured(this.app, dataType, tag);
		}

		return response;
	}
}
