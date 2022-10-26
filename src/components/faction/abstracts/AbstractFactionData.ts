import {AbstractModel} from "../../../api/modelsManager/abstracts/AbstractModel";
import {FactionDataInterface} from "../interfaces/FactionDataInterface";
import {FactionMetadataInterface} from "../interfaces/FactionMetadataInterface";

export abstract class AbstractFactionData extends AbstractModel implements FactionDataInterface {
	protected metadata: FactionMetadataInterface;
}
