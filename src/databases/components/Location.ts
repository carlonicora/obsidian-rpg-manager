import {LocationInterface} from "./interfaces/LocationInterface";
import {LocationMetadataInterface} from "../../metadatas/components/LocationMetadataInterface";
import {AbstractLocationData} from "./abstracts/data/AbstractLocationData";

export class Location extends AbstractLocationData implements LocationInterface {
	protected metadata: LocationMetadataInterface;
}
