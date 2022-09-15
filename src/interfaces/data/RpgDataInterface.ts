import {DataType} from "../../enums/DataType";
import {CachedMetadata, TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {RpgDataListInterface} from "./RpgDataListInterface";
import {BaseCampaignInterface} from "./BaseCampaignInterface";

export interface RpgDataInterface {
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
		dataList: RpgDataListInterface,
	): Promise<void>;

	loadRelationships(
	): Promise<void>;

	loadReverseRelationships(
	): Promise<void>;

	addReverseRelationship(
		name: string,
		relationship: RelationshipInterface,
	): void;

	getRelationships(
		type: DataType,
		isReversedRelationship: boolean,
	): RpgDataInterface[];

	validateId(
		dataList: RpgDataListInterface,
	): void;

	get name(): string;
	get path(): string;
	get link(): string;
	get image(): string|null;
	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
