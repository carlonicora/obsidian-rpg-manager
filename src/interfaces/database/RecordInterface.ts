import {DataType} from "../../enums/DataType";
import {TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {DatabaseInterface} from "./DatabaseInterface";
import {BaseCampaignInterface} from "../data/BaseCampaignInterface";
import {DataId} from "../DataId";

export interface RecordInterface {
	dataId: DataId|undefined;

	type: DataType;
	tag: string;
	tags: Array<string>;

	file: TFile;
	basename: string;

	frontmatter: any;

	completed: boolean;
	synopsis: string|null;

	additionalInformation: string|null;
	imageUrl: string|undefined;
	imageSrc: string|null|undefined;

	isOutline: boolean;
	campaign: BaseCampaignInterface;
	relationships: Map<string, RelationshipInterface>;

	initialise(
	): Promise<void>;

	reload(
	): void;

	loadHierarchy(
		database: DatabaseInterface,
	): Promise<void>;

	loadRelationships(
		database: DatabaseInterface,
	): Promise<void>;

	loadReverseRelationships(
		database: DatabaseInterface,
	): Promise<void>;

	addReverseRelationship(
		name: string,
		relationship: RelationshipInterface,
	): void;

	getRelationships(
		type: DataType,
		requiresReversedRelationship?: boolean,
	): Array<RelationshipInterface>;

	get name(): string;
	get path(): string;
	get link(): string;
	get image(): string|null;
	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
