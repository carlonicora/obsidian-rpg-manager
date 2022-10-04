import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {MusicDataInterface} from "./data/MusicDataInterface";

export interface MusicInterface extends ComponentInterface, MusicDataInterface {
	getThumbnail(): Promise<string | undefined>;
}
