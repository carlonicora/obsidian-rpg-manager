import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {ImageInterface} from "../../galleryService/interfaces/ImageInterface";
import {TFile} from "obsidian";

export interface CodeblockServiceInterface {
	addOrUpdateImage(
		path: string,
		caption: string,
	): Promise<ImageInterface|undefined>;

	addOrUpdateRelationship(
		relationship: RelationshipInterface,
	): Promise<void>;

	replaceID(
		file: TFile,
		ID: string,
	): Promise<void>;

	removeImage(
		path: string,
	): Promise<void>;

	removeRelationship(
		path: string,
	): Promise<void>;
}
