import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {MusicDataInterface} from "./MusicDataInterface";

export interface MusicInterface extends ComponentModelInterface, MusicDataInterface {
	getThumbnail(): Promise<string | undefined>;
}
