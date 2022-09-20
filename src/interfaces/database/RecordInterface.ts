import {DataType} from "../../enums/DataType";
import {TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {DatabaseInterface} from "./DatabaseInterface";
import {BaseCampaignInterface} from "../data/BaseCampaignInterface";
import {Id} from "../../database/Id";
import {RelationshipType} from "../../enums/RelationshipType";

export interface RecordInterface {
	id: Id;

	tags: Array<string>;

	file: TFile;
	basename: string;

	completed: boolean;
	synopsis: string|null;

	additionalInformation: string|null;
	imageUrl: string|undefined;
	imageSrc: string|null|undefined;

	isOutline: boolean;
	campaign: BaseCampaignInterface;
	relationships: Map<string, RelationshipInterface>;
	reverseRelationships: Map<string, RelationshipInterface>;

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
		requiredRelationshipType?: RelationshipType,
	): Array<RelationshipInterface>;

	get name(): string;
	get path(): string;
	get link(): string;
	get image(): string|null;
	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
