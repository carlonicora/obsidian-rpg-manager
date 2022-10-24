import {FactionMetadataInterface} from "./interfaces/FactionMetadataInterface";
import {FactionInterface} from "./interfaces/FactionInterface";
import {AbstractFactionData} from "./abstracts/AbstractFactionData";

export class Faction extends AbstractFactionData implements FactionInterface {
	protected metadata: FactionMetadataInterface;
}
