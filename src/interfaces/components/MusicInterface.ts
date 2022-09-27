import {ComponentInterface} from "../database/ComponentInterface";

export interface MusicInterface extends ComponentInterface {
	url: string|undefined;

	getThumbnail(): Promise<string|null|undefined>;
	getDynamicImageSrcElement(): Promise<HTMLElement|null>;
}
