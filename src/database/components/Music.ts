import {MusicMetadataInterface} from "../interfaces/metadata/components/MusicMetadataInterface";
import {YouTubeImageFetcherInterface} from "../../interfaces/fetchers/images/YouTubeImageFetcherInterface";
import {YouTubeImageFetcher} from "../../fetchers/YouTubeImageFetcher";
import {AbstractMusicData} from "./abstracts/data/AbstractMusicData";
import {MusicInterface} from "./interfaces/MusicInterface";

export class Music extends AbstractMusicData implements MusicInterface {
	protected metadata: MusicMetadataInterface;

	private dynamicImage: string | null | undefined;

	public get image(): string | undefined {
		if (super.image !== undefined) return super.image;
		if (this.url == undefined) return undefined;

		if (this.dynamicImage === undefined) {
			this._fetchImage()
				.then((image: string | null) => {
					this.dynamicImage = image;
				});
			return undefined;
		}

		return (this.dynamicImage != null ? this.dynamicImage : undefined);
	}

	public async getThumbnail(): Promise<string | undefined> {
		if (this.dynamicImage != null) return this.dynamicImage;

		if (this.url === undefined) return undefined;

		this.dynamicImage = await this._fetchImage();

		return (this.dynamicImage != null ? this.dynamicImage : undefined);
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
