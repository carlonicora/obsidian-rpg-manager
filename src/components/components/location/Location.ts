import {LocationInterface} from "./interfaces/LocationInterface";
import {LocationMetadataInterface} from "./interfaces/LocationMetadataInterface";
import {AbstractLocationData} from "./abstracts/AbstractLocationData";

export class Location extends AbstractLocationData implements LocationInterface {
	protected metadata: LocationMetadataInterface;
}
