import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {MusicMetadataInterface} from "../interfaces/MusicMetadataInterface";

export abstract class AbstractMusicData extends AbstractComponent {
	protected metadata: MusicMetadataInterface;

	public get url(): string | undefined {
		return this.metadata.data?.url;
	}
}
