import {MusicMetadataInterface} from "../interfaces/MusicMetadataInterface";
import {YouTubeImageFetcherInterface} from "../../../services/fetchers/YouTubeImageFetcherInterface";
import {YouTubeImageFetcher} from "../../../services/fetchers/YouTubeImageFetcher";
import {AbstractMusicData} from "../abstracts/AbstractMusicData";
import {MusicInterface} from "../interfaces/MusicInterface";

export class MusicModel extends AbstractMusicData implements MusicInterface {
	protected metadata: MusicMetadataInterface;

	private _dynamicImage: string | null | undefined;

	public get image(): string | undefined {
		if (super.images.length > 0) return super.images[0].src;
		if (this.url == undefined) return undefined;

		if (this._dynamicImage === undefined) {
			this._fetchImage()
				.then((image: string | null) => {
					this._dynamicImage = image;
				});
			return undefined;
		}

		return (this._dynamicImage != null ? this._dynamicImage : undefined);
	}

	public async getThumbnail(): Promise<string | undefined> {
		if (this._dynamicImage != null) return this._dynamicImage;

		if (this.url === undefined) return undefined;

		this._dynamicImage = await this._fetchImage();

		return (this._dynamicImage != null ? this._dynamicImage : undefined);
	}

	private async _fetchImage(
	): Promise<string|null> {
		let response: string | null = null;
		if (this.url == undefined) return null;

		if (this.url.indexOf('youtube.com') !== -1 || this.url.indexOf('youtu.be') !== -1){
			const fetcher: YouTubeImageFetcherInterface = await this.factories.fetchers.create(
				YouTubeImageFetcher,
			);
			response = await fetcher.fetchImage(this.url) ?? null;
		}

		return response;
	}
}
