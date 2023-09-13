export type ConflictStake =
	| "lifeanddeath"
	| "loveandrelationships"
	| "powerandcontrol"
	| "reputationandhonor"
	| "wealthandresources"
	| "freedomandjustice"
	| "knowledgeandinformation"
	| "moralityandethics"
	| "beliefsandvalues"
	| "futureandlegacy";

export interface ConflictInterface {
	title?: string;
	status: "planned" | "inprogress" | "resolved";
	category?: "ambition" | "betrayal" | "survival," | " revenge" | "ideology" | "love" | "guilt" | "fear";
	involvement?: "active" | "passive" | "unaware" | "forced" | "opportunistic";
	description?: string;
	stakes?: ConflictStake[];
	opposingforces?: string[];
	events?: string[];
	outcome?: string;
}
