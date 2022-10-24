import {ClueInterface} from "../interfaces/ClueInterface";
import {ClueMetadataInterface} from "../interfaces/ClueMetadataInterface";
import {AbstractClueData} from "../abstracts/AbstractClueData";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export class ClueModel extends AbstractClueData implements ClueInterface {
	protected metadata: ClueMetadataInterface;
}
