import {DataType} from "../../enums/DataType";
import {CachedMetadata, TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {RpgDataListInterface} from "./RpgDataListInterface";

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

	reload(
		file: TFile,
		metadata: CachedMetadata,
	): void;

	loadHierarchy(
		dataList: RpgDataListInterface,
	): void;

	loadRelationships(
		dataList: RpgDataListInterface,
	): void;

	loadReverseRelationships(
		dataList: RpgDataListInterface,
	): void;

	addReverseRelationship(
		name: string,
		relationship: RelationshipInterface,
	): void;

	getRelationships(
		type: DataType,
	): RpgDataInterface[];

	get name(): string;
	get path(): string;
	get link(): string;
	get image(): string|null;
	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
