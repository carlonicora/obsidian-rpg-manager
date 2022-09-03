import {ResponseElementInterface} from "./ResponseElementInterface";

export interface BannerResponseInterface extends ResponseElementInterface {
	image: string|null;
	title: string;
	subtitle: string|null;
	date: string|null;
}
