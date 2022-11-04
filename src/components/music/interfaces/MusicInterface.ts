import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {MusicDataInterface} from "./MusicDataInterface";

export interface MusicInterface extends ModelInterface, MusicDataInterface {
	getThumbnail(): Promise<string | undefined>;
}
