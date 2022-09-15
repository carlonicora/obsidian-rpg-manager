import {DataType} from "../../enums/DataType";
import {CachedMetadata, TFile} from "obsidian";
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

	frontmatter: any;

	completed: boolean;
	synopsis: string|null;

	additionalInformation: string|null;
	imageSrc: string|null|undefined;

	isOutline: boolean;
	campaign: BaseCampaignInterface;

	initialise(
	): Promise<void>;

	reload(
		file: TFile,
		metadata: CachedMetadata,
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
		isReversedRelationship: boolean,
	): RecordInterface[];

	get name(): string;
	get path(): string;
	get link(): string;
	get image(): string|null;
	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
