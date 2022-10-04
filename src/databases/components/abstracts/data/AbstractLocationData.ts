import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {LocationDataInterface} from "../../interfaces/data/LocationDataInterface";
import {LocationMetadataInterface} from "../../../../metadatas/components/LocationMetadataInterface";

export abstract class AbstractLocationData extends AbstractComponent implements LocationDataInterface {
	protected metadata: LocationMetadataInterface;

	public get address(): string | undefined {
		return this.metadata.data?.address;
	}
}
