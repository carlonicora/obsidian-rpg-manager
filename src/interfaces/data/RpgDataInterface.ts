import {DataType} from "../../enums/DataType";
import {CachedMetadata, FrontMatterCache, TFile} from "obsidian";

export interface RpgDataInterface {
	type: DataType;

	obsidianId: string;

	link: string;
	name: string;
	path: string;
	completed: boolean;
	links: Array<string>;
	tag: string|undefined;

	synopsis: string|null;
	additionalInformation: string|null;
	image: string|null|undefined;

	frontmatter: FrontMatterCache|undefined;

	reload(
		file: TFile,
		metadata: CachedMetadata,
	): void;

	getRelationships(
		type: DataType
	): RpgDataInterface[];

	get imageSrcElement(): HTMLElement|null;
	get folder(): string;
}
