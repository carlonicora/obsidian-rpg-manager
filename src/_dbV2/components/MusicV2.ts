import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {MusicV2Interface} from "./interfaces/MusicV2Interface";
import {MusicMetadataInterface} from "../metadatas/interfaces/MusicMetadataInterface";
import {YouTubeImageFetcherInterface} from "../../interfaces/fetchers/images/YouTubeImageFetcherInterface";
import {YouTubeImageFetcher} from "../../fetchers/YouTubeImageFetcher";

export class MusicV2 extends AbstractComponentV2 implements MusicV2Interface {
	protected metadata: MusicMetadataInterface;

	private dynamicImage: string | null | undefined;

	public get image(): string | undefined {
		if (super.image !== undefined) return super.image;
		if (this.metadata.url == undefined) return undefined;

		if (this.dynamicImage === undefined) {
			this._fetchImage()
				.then((image: string | null) => {
					this.dynamicImage = image;
				});
			return undefined;
		}

		return (this.dynamicImage != null ? this.dynamicImage : undefined);
	}

	public get url(): string | undefined {
		return this.metadata.url;
	}

	public async getThumbnail(): Promise<string | undefined> {
		if (this.dynamicImage != null) return this.dynamicImage;

		if (this.metadata.url === undefined) return undefined;

		this.dynamicImage = await this._fetchImage();

		return (this.dynamicImage != null ? this.dynamicImage : undefined);
	}

	private async _fetchImage(
	): Promise<string|null> {
		let response: string | null = null;
		if (this.metadata.url == undefined) return null;

		if (this.metadata.url.indexOf('youtube.com') !== -1 || this.metadata.url.indexOf('youtu.be') !== -1){
			const fetcher: YouTubeImageFetcherInterface = await this.factories.fetchers.create(
				YouTubeImageFetcher,
			);
			response = await fetcher.fetchImage(this.metadata.url) ?? null;
		}

		return response;
	}
}
