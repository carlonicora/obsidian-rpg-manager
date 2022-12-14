import {ImageFetcherInterface} from "../../interfaces/ImageFetcherInterface";

export interface YouTubeImageFetcherInterface extends ImageFetcherInterface {
	playlistEndPoint(
		playlistId: string,
	): string;

	songEndPoint(
		songId: string,
	): string;
}
