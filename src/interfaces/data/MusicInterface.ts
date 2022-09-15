import {RpgDataInterface} from "./RpgDataInterface";

export interface MusicInterface extends RpgDataInterface {
	url: string|undefined;

	getThumbnail(): Promise<string|null|undefined>;
	getDynamicImageSrcElement(): Promise<HTMLElement|null>;
}
