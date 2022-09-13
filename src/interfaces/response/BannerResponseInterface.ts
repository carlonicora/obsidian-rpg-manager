import {ResponseElementInterface} from "./ResponseElementInterface";

export interface BannerResponseInterface extends ResponseElementInterface {
	image: string|null|undefined;
	title: string;
	subtitle: string|null;
	date: string|null;
}
