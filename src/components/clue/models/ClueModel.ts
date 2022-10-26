import {ClueInterface} from "../interfaces/ClueInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {AbstractClueData} from "../abstracts/AbstractClueData";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export class ClueModel extends AbstractClueData implements ClueInterface {
	protected metadata: ClueMetadataInterface;
}
