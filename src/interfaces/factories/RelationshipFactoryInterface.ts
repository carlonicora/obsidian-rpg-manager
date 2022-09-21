import {TFile} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";

export interface RelationshipFactoryInterface {
	read(
		file: TFile,
		relationship: Map<string, RelationshipInterface>,
	): Promise<void>;


}
