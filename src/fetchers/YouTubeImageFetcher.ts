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
		const alternativeSongIdentifier = 'youtu.be/';

		let playlistId: string|undefined;
		let songId: string|undefined;

		try {
			if (url.indexOf(playlistIdentifier) !== -1) {
				playlistId = url.substring(url.indexOf(playlistIdentifier) + playlistIdentifier.length);
			} else if (url.indexOf(songIdentifier) !== -1) {
				songId = url.substring(url.indexOf(songIdentifier) + songIdentifier.length);
			} else if (url.indexOf(alternativeSongIdentifier) !== -1) {
				songId = url.substring(url.indexOf(alternativeSongIdentifier) + alternativeSongIdentifier.length);
			}

			if (playlistId !== undefined){
				apiResponse = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?key=' + youTubeApiKey + '&part=snippet&playlistId=' + playlistId);
			} else if (songId !== undefined){
				apiResponse = await fetch('https://www.googleapis.com/youtube/v3/videos?key=' + youTubeApiKey + '&part=snippet&id=' + songId);
			}

			if (apiResponse === undefined) return undefined;

			const jsonData = await apiResponse.json();
			if (jsonData === undefined) return undefined;

			return jsonData.items[0]?.snippet?.thumbnails?.high?.url;

		} catch (e) {
			return undefined;
		}
	}
}
