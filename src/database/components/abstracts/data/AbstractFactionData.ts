import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {FactionDataInterface} from "../../interfaces/data/FactionDataInterface";
import {FactionMetadataInterface} from "../../../interfaces/metadata/components/FactionMetadataInterface";

export abstract class AbstractFactionData extends AbstractComponent implements FactionDataInterface {
	protected metadata: FactionMetadataInterface;
}
