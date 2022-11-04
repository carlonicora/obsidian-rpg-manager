import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {LocationDataInterface} from "../interfaces/LocationDataInterface";
import {LocationMetadataInterface} from "../interfaces/LocationMetadataInterface";

export abstract class AbstractLocationData extends AbstractModel implements LocationDataInterface {
	protected metadata: LocationMetadataInterface;

	public get address(): string | undefined {
		return this.metadata.data?.address;
	}
}
