import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {LocationV2Interface} from "./interfaces/LocationV2Interface";
import {LocationMetadataInterface} from "../metadatas/interfaces/LocationMetadataInterface";

export class LocationV2 extends AbstractComponentV2 implements LocationV2Interface {
	protected metadata: LocationMetadataInterface;

	public get address(): string | undefined {
		return this.metadata.address;
	}
}
