import {ClueInterface} from "./interfaces/ClueInterface";
import {ClueMetadataInterface} from "./interfaces/ClueMetadataInterface";
import {AbstractClueData} from "./abstracts/AbstractClueData";

export class Clue extends AbstractClueData implements ClueInterface {
	protected metadata: ClueMetadataInterface;
}
