import {AbstractComponent} from "../../../core/abstracts/AbstractComponent";
import {LocationDataInterface} from "../interfaces/LocationDataInterface";
import {LocationMetadataInterface} from "../interfaces/LocationMetadataInterface";

export abstract class AbstractLocationData extends AbstractComponent implements LocationDataInterface {
	protected metadata: LocationMetadataInterface;

	public get address(): string | undefined {
		return this.metadata.data?.address;
	}
}
