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
	imageSrc: string|null|undefined;

	isOutline: boolean;
	campaign: BaseCampaignInterface;

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

	hasRelationship(
		name: string
	): boolean;

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
