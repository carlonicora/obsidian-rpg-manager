import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {FactionMetadataInterface} from "../interfaces/metadatas/FactionMetadataInterface";
import {FactionV2Interface} from "./interfaces/FactionV2Interface";

export class FactionV2 extends AbstractComponentV2 implements FactionV2Interface {
	protected metadata: FactionMetadataInterface;
}
