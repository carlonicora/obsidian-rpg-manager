import {ComponentStage} from "../../../core/enums/ComponentStage";
import {SubplotInterface} from "../interfaces/SubplotInterface";
import {SubplotMetadataInterface} from "../interfaces/SubplotMetadataInterface";
import {AbstractSubplotData} from "../abstracts/AbstractSubplotData";

export class SubplotModel extends AbstractSubplotData implements SubplotInterface {
	protected metadata: SubplotMetadataInterface;
	public stage: ComponentStage = ComponentStage.Subplot;
}
