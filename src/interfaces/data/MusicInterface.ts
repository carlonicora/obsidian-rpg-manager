import {RecordInterface} from "../database/RecordInterface";

export interface MusicInterface extends RecordInterface {
	url: string|undefined;

	getThumbnail(): Promise<string|null|undefined>;
	getDynamicImageSrcElement(): Promise<HTMLElement|null>;
}
