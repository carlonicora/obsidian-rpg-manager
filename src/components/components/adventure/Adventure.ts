import {AdventureInterface} from "./interfaces/AdventureInterface";
import {ComponentStage} from "../../enums/ComponentStage";
import {AdventureMetadataInterface} from "./interfaces/AdventureMetadataInterface";
import {AbstractAdventureData} from "./abstracts/AbstractAdventureData";

export class Adventure extends AbstractAdventureData implements AdventureInterface {
	protected metadata: AdventureMetadataInterface;
	public stage: ComponentStage = ComponentStage.Plot;
}
