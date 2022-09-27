import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {ComponentType} from "../enums/ComponentType";

export class TagHelper {
	public dataSettings: Map<ComponentType, string>;
	private requiredIds: Map<ComponentType, Array<ComponentType>>;

	constructor(
		private settings: RpgManagerSettingsInterface,
	) {
		this.dataSettings = new Map();
		this.dataSettings.set(ComponentType.Campaign, settings.campaignTag);
		this.dataSettings.set(ComponentType.Adventure, settings.adventureTag);
		this.dataSettings.set(ComponentType.Act, settings.actTag);
		this.dataSettings.set(ComponentType.Scene, settings.sceneTag);
		this.dataSettings.set(ComponentType.Session, settings.sessionTag);
		this.dataSettings.set(ComponentType.Character, settings.pcTag);
		this.dataSettings.set(ComponentType.Clue, settings.clueTag);
		this.dataSettings.set(ComponentType.Event, settings.eventTag);
		this.dataSettings.set(ComponentType.Faction, settings.factionTag);
		this.dataSettings.set(ComponentType.Location, settings.locationTag);
		this.dataSettings.set(ComponentType.NonPlayerCharacter, settings.npcTag);
		this.dataSettings.set(ComponentType.Music, settings.musicTag);
		this.dataSettings.set(ComponentType.Subplot, settings.subplotTag);

		this.requiredIds = new Map();
		this.requiredIds.set(ComponentType.Campaign, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Adventure, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Act, [ComponentType.Campaign, ComponentType.Adventure]);
		this.requiredIds.set(ComponentType.Scene, [ComponentType.Campaign, ComponentType.Adventure, ComponentType.Act, ComponentType.Scene]);
		this.requiredIds.set(ComponentType.Session, [ComponentType.Campaign, ComponentType.Session]);
		this.requiredIds.set(ComponentType.Character, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Clue, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Event, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Faction, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Location, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.NonPlayerCharacter, [ComponentType.Campaign]);
		this.requiredIds.set(ComponentType.Music, [ComponentType.Music]);
		this.requiredIds.set(ComponentType.Subplot, [ComponentType.Subplot]);
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
		if (tag.startsWith(this.dataSettings.get(ComponentType.Subplot) ?? '?')) return true;

		return false;
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
