import {TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";

export interface RelationshipFactoryInterface {
	readMetadata(
		file: TFile,
		relationship: Map<string, RelationshipInterface>,
		metadata: any,
	): Promise<void>;


}
