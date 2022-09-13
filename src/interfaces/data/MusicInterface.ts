import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface MusicInterface extends RpgDataInterface, RpgElementDataInterface {
	url: string|undefined;

	getThumbnail(): Promise<string|null|undefined>;
	getDynamicImageSrcElement(): Promise<HTMLElement|null>;
}
