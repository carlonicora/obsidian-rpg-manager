export enum SceneType {
	Action,
	Combat,
	Encounter,
	Exposition,
	Investigation,
	Planning,
	Preparation,
	Recap,
	SocialCombat,
}

export const sceneTypeDescription: Map<SceneType, string> = new Map<SceneType, string>([
	[SceneType.Action, 'Action: the pcs have to do something (active)'],
	[SceneType.Combat, 'Combat: fight scene (active)'],
	[SceneType.Encounter, 'Encounter: An NPC in involved'],
	[SceneType.Exposition, 'Exposition: Storyteller showtime'],
	[SceneType.Investigation, 'Investigation: Pcs analyse a scene (active)'],
	[SceneType.Planning, 'Planning: Pcs plans something (not exciteable)'],
	[SceneType.Preparation, 'Preparation: Pcs do something (active,not exciteable)'],
	[SceneType.Recap, 'Recap: Pcs talks amongst themselves (not exciteable)'],
	[SceneType.SocialCombat, 'Social Combat: PCs need to get something from NPCs (active)'],
]);
export const activeSceneTypes: Map<SceneType, boolean> = new Map<SceneType, boolean>([
	[SceneType.Action, true],
	[SceneType.Combat, true],
	[SceneType.Encounter, false],
	[SceneType.Exposition, false],
	[SceneType.Investigation, true],
	[SceneType.Planning, false],
	[SceneType.Preparation, true],
	[SceneType.Recap, false],
	[SceneType.SocialCombat, true],
]);
