import {ClueInterface} from "./interfaces/ClueInterface";
import {ClueMetadataInterface} from "../interfaces/metadata/components/ClueMetadataInterface";
import {AbstractClueData} from "./abstracts/data/AbstractClueData";

export class Clue extends AbstractClueData implements ClueInterface {
	protected metadata: ClueMetadataInterface;
}
