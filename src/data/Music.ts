import {AbstractElementRecord} from "../abstracts/AbstractElementRecord";
import {MusicInterface} from "../interfaces/data/MusicInterface";
import {YouTubeImageFetcherInterface} from "../interfaces/fetchers/images/YouTubeImageFetcherInterface";
import {YouTubeImageFetcher} from "../fetchers/YouTubeImageFetcher";
import {FrontMatterCache} from "obsidian";

export class Music extends AbstractElementRecord implements MusicInterface {
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
			const fetcher: YouTubeImageFetcherInterface = await this.app.plugins.getPlugin('rpg-manager').factories.fetchers.create(
				YouTubeImageFetcher,
			);
			return fetcher.fetchImage(this.url);
		}
	}
}
