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
}
