import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {RecordType} from "../enums/RecordType";

export class TagHelper {
	public dataSettings: Map<RecordType, string>;
	private requiredIds: Map<RecordType, Array<RecordType>>;

	constructor(
		private settings: RpgManagerSettingsInterface,
	) {
		this.dataSettings = new Map();
		this.dataSettings.set(RecordType.Campaign, settings.campaignTag);
		this.dataSettings.set(RecordType.Adventure, settings.adventureTag);
		this.dataSettings.set(RecordType.Act, settings.actTag);
		this.dataSettings.set(RecordType.Scene, settings.sceneTag);
		this.dataSettings.set(RecordType.Session, settings.sessionTag);
		this.dataSettings.set(RecordType.Character, settings.pcTag);
		this.dataSettings.set(RecordType.Clue, settings.clueTag);
		this.dataSettings.set(RecordType.Event, settings.eventTag);
		this.dataSettings.set(RecordType.Faction, settings.factionTag);
		this.dataSettings.set(RecordType.Location, settings.locationTag);
		this.dataSettings.set(RecordType.NonPlayerCharacter, settings.npcTag);
		this.dataSettings.set(RecordType.Music, settings.musicTag);
		this.dataSettings.set(RecordType.Subplot, settings.subplotTag);

		this.requiredIds = new Map();
		this.requiredIds.set(RecordType.Campaign, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Adventure, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Act, [RecordType.Campaign, RecordType.Adventure]);
		this.requiredIds.set(RecordType.Scene, [RecordType.Campaign, RecordType.Adventure, RecordType.Act, RecordType.Scene]);
		this.requiredIds.set(RecordType.Session, [RecordType.Campaign, RecordType.Session]);
		this.requiredIds.set(RecordType.Character, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Clue, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Event, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Faction, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Location, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.NonPlayerCharacter, [RecordType.Campaign]);
		this.requiredIds.set(RecordType.Music, [RecordType.Music]);
		this.requiredIds.set(RecordType.Subplot, [RecordType.Subplot]);
	}

	public sanitiseTags(
		tags: string|Array<string>|undefined,
	): Array<string> {
		if (tags == null) return [];

		let response: Array<string> = [];

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

	public getDataType(
		tag: string,
	): RecordType|undefined {
		if (tag.startsWith(this.dataSettings.get(RecordType.Campaign) ?? '?')) return RecordType.Campaign;
		if (tag.startsWith(this.dataSettings.get(RecordType.Adventure) ?? '?')) return RecordType.Adventure;
		if (tag.startsWith(this.dataSettings.get(RecordType.Act) ?? '?')) return RecordType.Act;
		if (tag.startsWith(this.dataSettings.get(RecordType.Scene) ?? '?')) return RecordType.Scene;
		if (tag.startsWith(this.dataSettings.get(RecordType.Session) ?? '?')) return RecordType.Session;
		if (tag.startsWith(this.dataSettings.get(RecordType.NonPlayerCharacter) ?? '?')) return RecordType.NonPlayerCharacter;
		if (tag.startsWith(this.dataSettings.get(RecordType.Character) ?? '?')) return RecordType.Character;
		if (tag.startsWith(this.dataSettings.get(RecordType.Clue) ?? '?')) return RecordType.Clue;
		if (tag.startsWith(this.dataSettings.get(RecordType.Location) ?? '?')) return RecordType.Location;
		if (tag.startsWith(this.dataSettings.get(RecordType.Faction) ?? '?')) return RecordType.Faction;
		if (tag.startsWith(this.dataSettings.get(RecordType.Event) ?? '?')) return RecordType.Event;
		if (tag.startsWith(this.dataSettings.get(RecordType.Music) ?? '?')) return RecordType.Music;
		if (tag.startsWith(this.dataSettings.get(RecordType.Subplot) ?? '?')) return RecordType.Subplot;

		return undefined;
	}

	public hasRpgManagerTags(
		tags: Array<string>,
	): boolean {
		for (let tagIndex=0; tagIndex<tags.length; tagIndex++){
			if (this.isRpgManagerTag(tags[tagIndex])) return true;
		}

		return false;
	}

	public isRpgManagerTag(
		tag: string,
	): boolean {
		if (tag.startsWith(this.dataSettings.get(RecordType.Campaign) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Adventure) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Act) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Scene) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Session) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.NonPlayerCharacter) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Character) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Clue) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Location) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Faction) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Event) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Music) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(RecordType.Subplot) ?? '?')) return true;

		return false;
	}

	public getId(
		type: RecordType,
		tag: string,
	): string|undefined {
		let response: string|undefined=undefined;

		const tagType = this.getDataType(tag);
		if (tagType === undefined) return undefined;

		const settings = this.dataSettings.get(tagType);
		if (settings === undefined) return undefined;

		const ids = tag.substring(settings.length + 1);
		if (ids === '') return undefined;

		const tagIds: Array<string> = ids.split('/');

		switch (type) {
			case RecordType.Campaign:
				response = tagIds[0] ? tagIds[0] : undefined;
				break;
			case RecordType.Adventure:
				response = +tagIds[1] ? tagIds[1] : undefined;
				break;
			case RecordType.Session:
				response = +tagIds[1] ? tagIds[1] : undefined;
				break;
			case RecordType.Act:
				response = +tagIds[2] ? tagIds[2] : undefined;
				break;
			case RecordType.Scene:
				response = +tagIds[3] ? tagIds[3] : undefined;
				break;
		}

		return response;
	}

	public getTag(
		tags: Array<string>,
	): string|undefined {
		if (tags == null) return undefined;

		let response: string|undefined;

		tags.forEach((tag: string) => {
			if (tag !== null && typeof tag === 'string') {
				if (tag.startsWith(this.dataSettings.get(RecordType.Campaign) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Adventure) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Act) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Scene) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Session) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.NonPlayerCharacter) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Character) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Clue) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Location) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Faction) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Event) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Music) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(RecordType.Subplot) ?? '?')) response = tag;
			}
		});

		return response;
	}

	public getTemplateDataType(
		tags: Array<string>|null,
	): RecordType|undefined {
		if (tags == null) return undefined;

		let response: RecordType|undefined;
		tags.forEach((tag: string) => {
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Campaign].toLowerCase())) response = RecordType.Campaign;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Adventure].toLowerCase())) response = RecordType.Adventure;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Act].toLowerCase())) response = RecordType.Act;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Scene].toLowerCase())) response = RecordType.Scene;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Session].toLowerCase())) response = RecordType.Session;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.NonPlayerCharacter].toLowerCase())) response = RecordType.NonPlayerCharacter;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Character].toLowerCase())) response = RecordType.Character;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Clue].toLowerCase())) response = RecordType.Clue;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Location].toLowerCase())) response = RecordType.Location;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Faction].toLowerCase())) response = RecordType.Faction;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Event].toLowerCase())) response = RecordType.Event;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Music].toLowerCase())) response = RecordType.Music;
			if (tag.startsWith('rpgm/template/' + RecordType[RecordType.Subplot].toLowerCase())) response = RecordType.Subplot;
		});

		return response;
	}
}
