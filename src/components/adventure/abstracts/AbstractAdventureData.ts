import {Plots} from "../../../services/plotsService/models/Plots";
import {AdventureDataInterface} from "../interfaces/AdventureDataInterface";
import {AdventureMetadataInterface} from "../interfaces/AdventureMetadataInterface";

export abstract class AbstractAdventureData extends Plots implements AdventureDataInterface {
	protected metadata: AdventureMetadataInterface;
}
