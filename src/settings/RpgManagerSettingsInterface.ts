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
	defaultVisible: boolean;
	fields: Array<RpgManagerAdvancedSettingsListElementInterface>;
}

export interface RpgManagerAdvancedSettingsListElementInterface {
	field: string;
	checked: boolean;
	required: boolean;
}


export const RpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	campaignTag: 'rpgm/campaign',
	adventureTag: 'rpgm/adventure',
	actTag: 'rpgm/act',
	sessionTag: 'rpgm/session',
	sceneTag: 'rpgm/scene',
	subplotTag: 'rpgm/subplot',
	npcTag: 'rpgm/npc',
	pcTag: 'rpgm/pc',
	locationTag: 'rpgm/location',
	factionTag: 'rpgm/faction',
	eventTag: 'rpgm/event',
	clueTag: 'rpgm/clue',
	musicTag: 'rpgm/music',
	automaticMove: true,
	templateFolder: '',
	YouTubeKey: '',
	previousVersion: '',
	advanced: {
		Agnostic: {
			ActList: {
				title: 'Acts',
				defaultVisible: true,
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			AdventureList: {
				title: 'Adventures',
				defaultVisible: true,
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			CharacterList: {
				title: 'Player Characters',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'age', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			ClueList: {
				title: 'Clues',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'found', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			EventList: {
				title: 'Events',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: false, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'date', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			FactionList: {
				title: 'Factions',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: false, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			LocationList: {
				title: 'Locations',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			MusicList: {
				title: 'Musics',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'url', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			NonPlayerCharacterList: {
				title: 'Non Player Characters',
				defaultVisible: true,
				fields: [
					{field: 'image', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'age', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			SceneList: {
				title: 'Scenes',
				defaultVisible: true,
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
				defaultVisible: true,
				fields: [
					{field: 'index', checked: true, required: false},
					{field: 'name', checked: true, required: true},
					{field: 'date', checked: true, required: false},
					{field: 'synopsis', checked: true, required: false},
				]
			},
			SubplotList: {
				title: 'Subplots',
				defaultVisible: false,
				fields: [
					{field: 'name', checked: true, required: true},
					{field: 'synopsis', checked: true, required: false},
				]
			}
		}
	}
}
