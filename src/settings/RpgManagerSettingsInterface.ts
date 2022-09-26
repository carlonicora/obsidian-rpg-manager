export interface RpgManagerSettingsInterface {
	campaignTag: string;
	adventureTag: string;
	actTag: string;
	sceneTag: string;
	sessionTag: string,
	npcTag: string;
	pcTag: string;
	locationTag: string;
	factionTag: string;
	eventTag: string;
	clueTag: string;
	automaticMove: boolean;
	templateFolder: string;
	musicTag: string;
	YouTubeKey: string;
	previousVersion: string;
	subplotTag:string;
	advanced: RpgManagerAdvanceSettingsSettingListInterface;
}

export interface RpgManagerAdvanceSettingsSettingListInterface {
	Agnostic: RpgManagerAdvancedSettingsInterface;
}

export interface RpgManagerAdvancedSettingsInterface {
	ActList: RpgManagerAdvancedSettingsListsInterface;
	AdventureList: RpgManagerAdvancedSettingsListsInterface;
	CharacterList: RpgManagerAdvancedSettingsListsInterface;
	ClueList: RpgManagerAdvancedSettingsListsInterface;
	EventList: RpgManagerAdvancedSettingsListsInterface;
	FactionList: RpgManagerAdvancedSettingsListsInterface;
	LocationList: RpgManagerAdvancedSettingsListsInterface;
	MusicList: RpgManagerAdvancedSettingsListsInterface;
	NonPlayerCharacterList: RpgManagerAdvancedSettingsListsInterface;
	SceneList: RpgManagerAdvancedSettingsListsInterface;
	SessionList: RpgManagerAdvancedSettingsListsInterface;
	SubplotList: RpgManagerAdvancedSettingsListsInterface;
}

export interface RpgManagerAdvancedSettingsListsInterface {
	title: string;
	fields: Array<RpgManagerAdvancedSettingsListElementInterface>;
}

export interface RpgManagerAdvancedSettingsListElementInterface {
	field: string;
	checked: boolean;
	required: boolean;
}


export const RpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	campaignTag: 'rpgm/outline/campaign',
	adventureTag: 'rpgm/outline/adventure',
	actTag: 'rpgm/outline/act',
	sessionTag: 'rpgm/outline/session',
	sceneTag: 'rpgm/outline/scene',
	npcTag: 'rpgm/element/character/npc',
	pcTag: 'rpgm/element/character/pc',
	locationTag: 'rpgm/element/location',
	factionTag: 'rpgm/element/faction',
	eventTag: 'rpgm/element/event',
	clueTag: 'rpgm/element/clue',
	automaticMove: true,
	templateFolder: '',
	musicTag: 'rpgm/element/music',
	YouTubeKey: '',
	previousVersion: '',
	subplotTag: 'rpgm/outline/subplot',
	advanced: {
		Agnostic: {
			ActList: {
				title: 'Acts',
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			AdventureList: {
				title: 'Adventures',
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			CharacterList: {
				title: 'Player Characters',
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'age', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			ClueList: {
				title: 'Clues',
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'found', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			EventList: {
				title: 'Events',
				fields: [
					{field: 'image', checked: false, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'date', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			FactionList: {
				title: 'Factions',
				fields: [
					{field: 'image', checked: false, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			LocationList: {
				title: 'Locations',
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			MusicList: {
				title: 'Musics',
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'url', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			NonPlayerCharacterList: {
				title: 'Non Player Characters',
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'age', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			SceneList: {
				title: 'Scenes',
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'storyCircleIndicator', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
					{field: 'date', checked: true, required: false},
					{field: 'startTime', checked: false, required: false},
					{field: 'endTime', checked: false, required: false},
					{field: 'duration', checked: false, required: false},
				]
			},
			SessionList: {
				title: 'Sessions',
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'date', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			SubplotList: {
				title: 'Subplots',
				fields: [
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			}
		}
	}
}
