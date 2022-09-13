import {CachedMetadata, TFile} from "obsidian";
import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {FetcherType} from "../enums/FetcherType";
import {YouTubeImageFetcherInterface} from "../interfaces/fetchers/images/YouTubeImageFetcherInterface";

export class Music extends AbstractRpgElementData implements MusicInterface {
	public url: string|undefined;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		this.url = this.frontmatter?.url;
	}

	public getThumbnail(): Promise<string|null|undefined> {
		const imageUrl = this.fetchImage();
		imageUrl
			.then((imageUrl: string|null|undefined) => {
				this.image = imageUrl;
			});

		return imageUrl;
	}

	public async getDynamicImageSrcElement(
	): Promise<HTMLElement|null> {
		if (this.image == null) {
			this.image = await this.fetchImage();
		}

		return this.imageSrcElement;
	}

	private async fetchImage(
	): Promise<string|undefined|null> {
		if (this.url == undefined) return undefined;

		if (this.url.indexOf('youtube.com') !== -1 || this.url.indexOf('youtu.be') !== -1){
			const fetcher: YouTubeImageFetcherInterface = this.app.plugins.getPlugin('rpg-manager').factories.fetchers.create(FetcherType.YouTubeImage);
			return fetcher.fetchImage(this.url);
		}
	}
}
