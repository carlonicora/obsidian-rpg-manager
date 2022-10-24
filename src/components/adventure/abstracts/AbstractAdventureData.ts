import {Plots} from "../../../services/plots/Plots";
import {AdventureDataInterface} from "../interfaces/AdventureDataInterface";
import {AdventureMetadataInterface} from "../interfaces/AdventureMetadataInterface";

export abstract class AbstractAdventureData extends Plots implements AdventureDataInterface {
	protected metadata: AdventureMetadataInterface
}
