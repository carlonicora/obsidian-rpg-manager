import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {ComponentType} from "../components/enums/ComponentType";

export class TagHelper {
	public static campaignTag = 'rpgm/campaign';
	public static adventureTag = 'rpgm/adventure';
	public static actTag = 'rpgm/act';
	public static sceneTag = 'rpgm/scene';
	public static sessionTag = 'rpgm/session';
	public static npcTag = 'rpgm/npc';
	public static pcTag = 'rpgm/pc';
	public static locationTag = 'rpgm/location';
	public static factionTag = 'rpgm/faction';
	public static eventTag = 'rpgm/event';
	public static clueTag = 'rpgm/clue';
	public static musicTag = 'rpgm/music';
	public static subplotTag ='rpgm/subplot';

	public dataSettings: Map<ComponentType, string>;
	private _requiredIds: Map<ComponentType, Array<ComponentType>>;

	constructor(
		private _settings: RpgManagerSettingsInterface,
	) {
		this.dataSettings = new Map();
		this.dataSettings.set(ComponentType.Campaign, TagHelper.campaignTag);
		this.dataSettings.set(ComponentType.Adventure, TagHelper.adventureTag);
		this.dataSettings.set(ComponentType.Act, TagHelper.actTag);
		this.dataSettings.set(ComponentType.Scene, TagHelper.sceneTag);
		this.dataSettings.set(ComponentType.Session, TagHelper.sessionTag);
		this.dataSettings.set(ComponentType.Character, TagHelper.pcTag);
		this.dataSettings.set(ComponentType.Clue, TagHelper.clueTag);
		this.dataSettings.set(ComponentType.Event, TagHelper.eventTag);
		this.dataSettings.set(ComponentType.Faction, TagHelper.factionTag);
		this.dataSettings.set(ComponentType.Location, TagHelper.locationTag);
		this.dataSettings.set(ComponentType.NonPlayerCharacter, TagHelper.npcTag);
		this.dataSettings.set(ComponentType.Music, TagHelper.musicTag);
		this.dataSettings.set(ComponentType.Subplot, TagHelper.subplotTag);

		this._requiredIds = new Map();
		this._requiredIds.set(ComponentType.Campaign, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Adventure, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Act, [ComponentType.Campaign, ComponentType.Adventure]);
		this._requiredIds.set(ComponentType.Scene, [ComponentType.Campaign, ComponentType.Adventure, ComponentType.Act, ComponentType.Scene]);
		this._requiredIds.set(ComponentType.Session, [ComponentType.Campaign, ComponentType.Session]);
		this._requiredIds.set(ComponentType.Character, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Clue, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Event, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Faction, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Location, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.NonPlayerCharacter, [ComponentType.Campaign]);
		this._requiredIds.set(ComponentType.Music, [ComponentType.Music]);
		this._requiredIds.set(ComponentType.Subplot, [ComponentType.Subplot]);
	}

	public sanitiseTags(
		tags: string|Array<string>|undefined,
	): Array<string> {
		if (tags == null) return [];

		let temporaryResponse: Array<string> = [];

		if (typeof tags === 'string'){
			temporaryResponse = tags.split(',');
			temporaryResponse.forEach((tag: string) => {
				tag = tag.replaceAll(' ', '').replaceAll('#', '');
			});
		} else {
			temporaryResponse = tags;
		}

		const response: Array<string> = [];

		temporaryResponse.forEach((tag: string|null) => {
			if (tag != null) response.push(tag);
		})

		return response;
	}

	public getDataType(
		tag: string,
	): ComponentType|undefined {
		if (tag.startsWith(this.dataSettings.get(ComponentType.Campaign) ?? '?')) return ComponentType.Campaign;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Adventure) ?? '?')) return ComponentType.Adventure;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Act) ?? '?')) return ComponentType.Act;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Scene) ?? '?')) return ComponentType.Scene;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Session) ?? '?')) return ComponentType.Session;
		if (tag.startsWith(this.dataSettings.get(ComponentType.NonPlayerCharacter) ?? '?')) return ComponentType.NonPlayerCharacter;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Character) ?? '?')) return ComponentType.Character;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Clue) ?? '?')) return ComponentType.Clue;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Location) ?? '?')) return ComponentType.Location;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Faction) ?? '?')) return ComponentType.Faction;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Event) ?? '?')) return ComponentType.Event;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Music) ?? '?')) return ComponentType.Music;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Subplot) ?? '?')) return ComponentType.Subplot;

		return undefined;
	}

	public hasRpgManagerTags(
		tags: Array<string>,
	): boolean {
		for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
			if (this.isRpgManagerTag(tags[tagIndex])) return true;
		}

		return false;
	}

	public isRpgManagerTag(
		tag: string,
	): boolean {
		if (tag == null) throw new Error('');

		if (tag.startsWith(this.dataSettings.get(ComponentType.Campaign) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Adventure) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Act) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Scene) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Session) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.NonPlayerCharacter) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Character) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Clue) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Location) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Faction) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Event) ?? '?')) return true;
		if (tag.startsWith(this.dataSettings.get(ComponentType.Music) ?? '?')) return true;
		return tag.startsWith(this.dataSettings.get(ComponentType.Subplot) ?? '?');
	}

	public getId(
		type: ComponentType,
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
			case ComponentType.Campaign:
				response = tagIds[0] ? tagIds[0] : undefined;
				break;
			case ComponentType.Adventure:
				response = +tagIds[1] ? tagIds[1] : undefined;
				break;
			case ComponentType.Session:
				response = +tagIds[1] ? tagIds[1] : undefined;
				break;
			case ComponentType.Act:
				response = +tagIds[2] ? tagIds[2] : undefined;
				break;
			case ComponentType.Scene:
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
				if (tag.startsWith(this.dataSettings.get(ComponentType.Campaign) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Adventure) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Act) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Scene) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Session) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.NonPlayerCharacter) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Character) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Clue) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Location) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Faction) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Event) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Music) ?? '?')) response = tag;
				if (tag.startsWith(this.dataSettings.get(ComponentType.Subplot) ?? '?')) response = tag;
			}
		});

		return response;
	}

	public fuzzyTagGuesser(
		tag: string
	): {tag: string, type: ComponentType}|undefined {
		const response: string|undefined = undefined;

		const settings: any = this._settings;
		const oldCampaignTag: string|undefined = settings.campaignTag;
		const oldAdventureTag: string|undefined = settings.adventureTag;
		const oldActTag: string|undefined = settings.actTag;
		const oldSceneTag: string|undefined = settings.sceneTag;
		const oldSessionTag: string|undefined = settings.sessionTag;
		const oldSubplotTag: string|undefined = settings.subplotTag;
		const oldPcTag: string|undefined = settings.pcTag;
		const oldNpcTag: string|undefined = settings.npcTag;
		const oldClueTag: string|undefined = settings.clueTag;
		const oldEventTag: string|undefined = settings.eventTag;
		const oldLocationTag: string|undefined = settings.locationTag;
		const oldFactionTag: string|undefined = settings.factionTag;
		const oldMusicTag: string|undefined = settings.musicTag;

		if (oldCampaignTag !== undefined && tag.startsWith(oldCampaignTag)) return {tag: oldCampaignTag, type: ComponentType.Campaign};
		if (oldAdventureTag !== undefined && tag.startsWith(oldAdventureTag)) return {tag: oldAdventureTag, type: ComponentType.Adventure};
		if (oldActTag !== undefined && tag.startsWith(oldActTag)) return {tag: oldActTag, type: ComponentType.Act};
		if (oldSceneTag !== undefined && tag.startsWith(oldSceneTag)) return {tag: oldSceneTag, type: ComponentType.Scene};
		if (oldSessionTag !== undefined && tag.startsWith(oldSessionTag)) return {tag: oldSessionTag, type: ComponentType.Session};
		if (oldSubplotTag !== undefined && tag.startsWith(oldSubplotTag)) return {tag: oldSubplotTag, type: ComponentType.Subplot};
		if (oldPcTag !== undefined && tag.startsWith(oldPcTag)) return {tag: oldPcTag, type: ComponentType.Character};
		if (oldNpcTag !== undefined && tag.startsWith(oldNpcTag)) return {tag: oldNpcTag, type: ComponentType.NonPlayerCharacter};
		if (oldClueTag !== undefined && tag.startsWith(oldClueTag)) return {tag: oldClueTag, type: ComponentType.Clue};
		if (oldEventTag !== undefined && tag.startsWith(oldEventTag)) return {tag: oldEventTag, type: ComponentType.Event};
		if (oldLocationTag !== undefined && tag.startsWith(oldLocationTag)) return {tag: oldLocationTag, type: ComponentType.Location};
		if (oldFactionTag !== undefined && tag.startsWith(oldFactionTag)) return {tag: oldFactionTag, type: ComponentType.Faction};
		if (oldMusicTag !== undefined && tag.startsWith(oldMusicTag)) return {tag: oldMusicTag, type: ComponentType.Music};

		if (tag.startsWith('rpgm/outline/campaign')) return {tag: tag, type: ComponentType.Campaign};
		if (tag.startsWith('rpgm/outline/adventure')) return {tag: tag, type: ComponentType.Adventure};
		if (tag.startsWith('rpgm/outline/act')) return {tag: tag, type: ComponentType.Act};
		if (tag.startsWith('rpgm/outline/scene')) return {tag: tag, type: ComponentType.Scene};
		if (tag.startsWith('rpgm/outline/session')) return {tag: tag, type: ComponentType.Session};
		if (tag.startsWith('rpgm/outline/subplot')) return {tag: tag, type: ComponentType.Subplot};
		if (tag.startsWith('rpgm/element/character/pc')) return {tag: tag, type: ComponentType.Character};
		if (tag.startsWith('rpgm/element/character/npc')) return {tag: tag, type: ComponentType.NonPlayerCharacter};
		if (tag.startsWith('rpgm/element/clue')) return {tag: tag, type: ComponentType.Clue};
		if (tag.startsWith('rpgm/element/event')) return {tag: tag, type: ComponentType.Event};
		if (tag.startsWith('rpgm/element/location')) return {tag: tag, type: ComponentType.Location};
		if (tag.startsWith('rpgm/element/faction')) return {tag: tag, type: ComponentType.Faction};
		if (tag.startsWith('rpgm/element/music')) return {tag: tag, type: ComponentType.Music};

		if (tag.toLowerCase().indexOf('campaign') !== -1) return {tag: tag, type: ComponentType.Campaign};
		if (tag.toLowerCase().indexOf('adventure') !== -1) return {tag: tag, type: ComponentType.Adventure};
		if (tag.toLowerCase().indexOf('act') !== -1) return {tag: tag, type: ComponentType.Act};
		if (tag.toLowerCase().indexOf('scene') !== -1) return {tag: tag, type: ComponentType.Scene};
		if (tag.toLowerCase().indexOf('session') !== -1) return {tag: tag, type: ComponentType.Session};
		if (tag.toLowerCase().indexOf('subplot') !== -1) return {tag: tag, type: ComponentType.Subplot};
		if (tag.toLowerCase().indexOf('pc') !== -1) return {tag: tag, type: ComponentType.Character};
		if (tag.toLowerCase().indexOf('npc') !== -1) return {tag: tag, type: ComponentType.NonPlayerCharacter};
		if (tag.toLowerCase().indexOf('clue') !== -1) return {tag: tag, type: ComponentType.Clue};
		if (tag.toLowerCase().indexOf('event') !== -1) return {tag: tag, type: ComponentType.Event};
		if (tag.toLowerCase().indexOf('location') !== -1) return {tag: tag, type: ComponentType.Location};
		if (tag.toLowerCase().indexOf('faction') !== -1) return {tag: tag, type: ComponentType.Faction};
		if (tag.toLowerCase().indexOf('music') !== -1) return {tag: tag, type: ComponentType.Music};

		return response;
	}

	public fuzzyTagsGuesser(
		tags: Array<string>,
	): {tag: string, type: ComponentType}|undefined {
		if (tags == null) return undefined;

		let response: {tag: string, type: ComponentType}|undefined;

		for (let index=0; index<tags.length; index++){
			response = this.fuzzyTagGuesser(tags[index]);
			if (response !== undefined && response.tag.indexOf('rpgm') === -1) response = undefined;
		}

		if (response !== undefined){
			for (let index=0; index<tags.length; index++){
				if (tags[index].startsWith(response.tag)) response.tag = tags[index];
			}
		}

		return response;
	}

	public getTemplateDataType(
		tags: Array<string>|null,
	): ComponentType|undefined {
		if (tags == null) return undefined;

		let response: ComponentType|undefined;
		tags.forEach((tag: string) => {
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Campaign].toLowerCase())) response = ComponentType.Campaign;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Adventure].toLowerCase())) response = ComponentType.Adventure;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Act].toLowerCase())) response = ComponentType.Act;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Scene].toLowerCase())) response = ComponentType.Scene;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Session].toLowerCase())) response = ComponentType.Session;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.NonPlayerCharacter].toLowerCase())) response = ComponentType.NonPlayerCharacter;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Character].toLowerCase())) response = ComponentType.Character;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Clue].toLowerCase())) response = ComponentType.Clue;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Location].toLowerCase())) response = ComponentType.Location;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Faction].toLowerCase())) response = ComponentType.Faction;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Event].toLowerCase())) response = ComponentType.Event;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Music].toLowerCase())) response = ComponentType.Music;
			if (tag.startsWith('rpgm/template/' + ComponentType[ComponentType.Subplot].toLowerCase())) response = ComponentType.Subplot;
		});

		return response;
	}
}
