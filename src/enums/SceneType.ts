export enum SceneType {
	Action,
	Combat,
	Decision,
	Encounter,
	Exposition,
	Investigation,
	Planning,
	Preparation,
	Recap,
}

export const sceneTypeDescription: Map<SceneType, string> = new Map<SceneType, string>([
	[SceneType.Action, 'Action: the pcs have to do something'],
	[SceneType.Combat, 'Combat: fight scene'],
	[SceneType.Decision, 'Decision: the pcs must take a decision'],
	[SceneType.Encounter, 'Encounter: discussion with an npc'],
	[SceneType.Exposition, 'Exposition: Storyteller showtime'],
	[SceneType.Investigation, 'Investigation: Pcs analyse a scene'],
	[SceneType.Planning, 'Planning: Pcs plans something'],
	[SceneType.Preparation, 'Preparation: Pcs do something'],
	[SceneType.Recap, 'Recap: Pcs talks amongst themselves'],
]);
