import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {ClueV2Interface} from "./interfaces/ClueV2Interface";
import {ClueMetadataInterface} from "../interfaces/metadatas/ClueMetadataInterface";

export class ClueV2 extends AbstractComponentV2 implements ClueV2Interface {
	protected metadata: ClueMetadataInterface;

	public get found(): Date | undefined {
		return (this.metadata.found ? new Date(this.metadata.found) : undefined);
	}
}
