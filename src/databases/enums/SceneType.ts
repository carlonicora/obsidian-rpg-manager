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
	[SceneType.Action, 'Action: the pcs have to do something'],
	[SceneType.Combat, 'Combat: fight scene'],
	[SceneType.Encounter, 'Encounter: An NPC in involved'],
	[SceneType.Exposition, 'Exposition: Storyteller showtime'],
	[SceneType.Investigation, 'Investigation: Pcs analyse a scene'],
	[SceneType.Planning, 'Planning: Pcs plans something'],
	[SceneType.Preparation, 'Preparation: Pcs do something'],
	[SceneType.Recap, 'Recap: Pcs talks amongst themselves'],
	[SceneType.SocialCombat, 'Social Combat: PCs need to get something from NPCs'],
]);
