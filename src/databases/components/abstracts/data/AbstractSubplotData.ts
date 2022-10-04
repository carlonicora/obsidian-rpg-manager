import {SubplotDataInterface} from "../../interfaces/data/SubplotDataInterface";
import {SubplotMetadataInterface} from "../../../../metadatas/components/SubplotMetadataInterface";
import {Plots} from "../../../../plots/Plots";

export abstract class AbstractSubplotData extends Plots implements SubplotDataInterface {
	protected metadata: SubplotMetadataInterface;
}
