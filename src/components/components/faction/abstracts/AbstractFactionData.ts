import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {FactionDataInterface} from "../interfaces/FactionDataInterface";
import {FactionMetadataInterface} from "../interfaces/FactionMetadataInterface";

export abstract class AbstractFactionData extends AbstractComponent implements FactionDataInterface {
	protected metadata: FactionMetadataInterface;
}
