import {AbstractComponentElement} from "../abstracts/AbstractComponentElement";
import {MusicInterface} from "../interfaces/components/MusicInterface";
import {YouTubeImageFetcherInterface} from "../interfaces/fetchers/images/YouTubeImageFetcherInterface";
import {YouTubeImageFetcher} from "../fetchers/YouTubeImageFetcher";
import {FrontMatterCache} from "obsidian";

export class Music extends AbstractComponentElement implements MusicInterface {
	public url: string|undefined;

	protected initialiseData(

		frontmatter: FrontMatterCache|undefined,
	): void {
		this.url = frontmatter?.url;

		super.initialiseData(frontmatter);
	}

	public getThumbnail(): Promise<string|null|undefined> {
		const imageUrl = this.fetchImage();
		imageUrl
			.then((imageUrl: string|null|undefined) => {
				if (imageUrl == null) {
					this.imageSrc = undefined;
				} else {
					this.imageSrc = imageUrl;
				}
			});

		return imageUrl;
	}

	public async getDynamicImageSrcElement(
	): Promise<HTMLElement|null> {
		if (this.imageSrc === null) {
			this.imageSrc = await this.fetchImage();
		}

		return this.imageSrcElement;
	}

	private async fetchImage(
	): Promise<string|undefined|null> {
		if (this.url == undefined) return undefined;

		if (this.url.indexOf('youtube.com') !== -1 || this.url.indexOf('youtu.be') !== -1){
			const fetcher: YouTubeImageFetcherInterface = await this.factories.fetchers.create(
				YouTubeImageFetcher,
			);
			return fetcher.fetchImage(this.url);
		}
	}
}
