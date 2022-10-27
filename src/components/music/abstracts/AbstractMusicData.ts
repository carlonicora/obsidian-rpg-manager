import {AbstractModel} from "../../../managers/modelsManager/abstracts/AbstractModel";
import {MusicMetadataInterface} from "../interfaces/MusicMetadataInterface";

export abstract class AbstractMusicData extends AbstractModel {
	protected metadata: MusicMetadataInterface;

	public get url(): string | undefined {
		return this.metadata.data?.url;
	}
}
