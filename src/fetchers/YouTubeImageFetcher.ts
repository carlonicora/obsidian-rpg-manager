import {YouTubeImageFetcherInterface} from "../interfaces/fetchers/images/YouTubeImageFetcherInterface";
import {AbstractFetcher} from "../abstracts/AbstractFetcher";

export class YouTubeImageFetcher extends AbstractFetcher implements YouTubeImageFetcherInterface{
	public async fetchImage(
		url: string,
	): Promise<string|null|undefined> {
		const youTubeApiKey = this.app.plugins.getPlugin('rpg-manager').settings.YouTubeKey;

		if (youTubeApiKey === '' || youTubeApiKey == null) return undefined;
		let apiResponse: any|undefined;

		const playlistIdentifier = 'playlist?list=';
		const songIdentifier = 'watch?v='

		console.log('url', url);
		if (url.indexOf(playlistIdentifier) !== -1){
			const playlistId = url.substring(url.indexOf(playlistIdentifier) + playlistIdentifier.length);

			apiResponse = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?key=' + youTubeApiKey + '&part=snippet&playlistId=' + playlistId);
		} else if (url.indexOf(songIdentifier) !== -1) {
			const songId = url.substring(url.indexOf(songIdentifier) + songIdentifier.length);

			apiResponse = await fetch('https://www.googleapis.com/youtube/v3/videos?key=' + youTubeApiKey + '&part=snippet&id=' + songId);
		}

		const jsonData = await apiResponse.json();
		if (jsonData === undefined) return undefined;

		return jsonData.items[0]?.snippet?.thumbnails?.high?.url;
	}
}
