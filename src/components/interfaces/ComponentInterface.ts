import {DatabaseInterface} from "../../databases/interfaces/DatabaseInterface";
import {ComponentDataInterface} from "./ComponentDataInterface";
import {AbtInterface} from "../../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../plots/interfaces/StoryCircleInterface";
import {RelationshipListInterface} from "../../relationships/interfaces/RelationshipListInterface";

export interface ComponentInterface extends ComponentDataInterface{
	get link(): string;
	get hasStoryCirclePlot(): boolean;
	get hasAbtPlot(): boolean;
	get abt(): AbtInterface;
	get storyCircle(): StoryCircleInterface;

	readMetadata(
	): Promise<void>;

	initialiseData(
	): Promise<void>;

	initialiseRelationships(
	): Promise<void>

	getRelationships(
		database?: DatabaseInterface|undefined,
	): RelationshipListInterface;

	validateHierarchy(
	): void;
}
