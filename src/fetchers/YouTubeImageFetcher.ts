import {YouTubeImageFetcherInterface} from "./YouTubeImageFetcherInterface";
import {AbstractFetcher} from "./abstracts/AbstractFetcher";
import {ImageFetcherInterface} from "./interfaces/ImageFetcherInterface";
import {FetcherInterface} from "./interfaces/FetcherInterface";

export class YouTubeImageFetcher extends AbstractFetcher implements YouTubeImageFetcherInterface, ImageFetcherInterface, FetcherInterface {
	public fetchUrl ='https://www.googleapis.com/youtube/v3/';

    playlistEndPoint(
		playlistId: string,
	): string {
		return this.fetchUrl +
			'playlistItems?key=' +
			this.settings.YouTubeKey +
			'&part=snippet&playlistId=' +
			playlistId;
    }

    songEndPoint(
		songId: string,
	): string {
        return this.fetchUrl +
			'videos?key=' +
			this.settings.YouTubeKey +
			'&part=snippet&id=' +
			songId;
    }

	public async fetchImage(
		url: string,
	): Promise<string|null|undefined> {
		const youTubeApiKey = this.settings.YouTubeKey;

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
				apiResponse = await fetch(this.playlistEndPoint(playlistId));
			} else if (songId !== undefined){
				apiResponse = await fetch(this.songEndPoint(songId));
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
