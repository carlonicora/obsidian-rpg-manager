import {DatabaseInterface} from "../../../database/interfaces/DatabaseInterface";
import {ComponentDataInterface} from "../../../core/interfaces/ComponentDataInterface";
import {AbtInterface} from "../../../services/plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../../services/plots/interfaces/StoryCircleInterface";
import {RelationshipListInterface} from "../../../services/relationships/interfaces/RelationshipListInterface";

export interface ComponentModelInterface extends ComponentDataInterface{
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
