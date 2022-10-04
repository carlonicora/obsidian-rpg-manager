import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {FactionDataInterface} from "../../interfaces/data/FactionDataInterface";
import {FactionMetadataInterface} from "../../../../metadatas/components/FactionMetadataInterface";

export abstract class AbstractFactionData extends AbstractComponent implements FactionDataInterface {
	protected metadata: FactionMetadataInterface;
}
