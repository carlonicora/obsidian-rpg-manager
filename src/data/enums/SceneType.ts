export enum SceneType {
	Action = "action",
	Combat = "combat",
	Decision = "decision",
	Encounter = "encounter",
	Exposition = "exposition",
	Investigation = "investigation",
	Preparation = "preparation",
	Recap = "recap",
	SocialCombat = "socialcombat",
}

export function isSceneActive(type: SceneType): boolean {
	switch (type) {
		case SceneType.Action:
		case SceneType.Combat:
		case SceneType.Investigation:
		case SceneType.SocialCombat:
			return true;
		default:
			return false;
	}
}
