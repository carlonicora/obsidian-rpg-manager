import {Plots} from "../../../../plots/Plots";
import {AdventureDataInterface} from "../../interfaces/data/AdventureDataInterface";
import {AdventureMetadataInterface} from "../../../../metadatas/components/AdventureMetadataInterface";

export abstract class AbstractAdventureData extends Plots implements AdventureDataInterface {
	protected metadata: AdventureMetadataInterface
}
