import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {DatabaseInterface} from "./DatabaseInterface";
import {ComponentDataInterface} from "../components/interfaces/ComponentDataInterface";
import {AbtInterface} from "../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../plots/interfaces/StoryCircleInterface";

export interface ComponentInterface extends ComponentDataInterface{
	get link(): string;
	get hasStoryCirclePlot(): boolean;
	get hasAbtPlot(): boolean;
	get abt(): AbtInterface;
	get storyCircle(): StoryCircleInterface;

	readMetadata(
	): Promise<void>;

	getRelationships(
		database?: DatabaseInterface|undefined,
	): Array<RelationshipInterface>;

	addRelationship(
		relationship: RelationshipInterface,
		database?: DatabaseInterface|undefined,
	): void;

	existsInRelationships(
		relationships: Array<RelationshipInterface>,
	): boolean;
}
