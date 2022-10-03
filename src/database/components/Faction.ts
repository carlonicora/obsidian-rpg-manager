import {FactionMetadataInterface} from "../interfaces/metadata/components/FactionMetadataInterface";
import {FactionInterface} from "./interfaces/FactionInterface";
import {AbstractFactionData} from "./abstracts/data/AbstractFactionData";

export class Faction extends AbstractFactionData implements FactionInterface {
	protected metadata: FactionMetadataInterface;
}
