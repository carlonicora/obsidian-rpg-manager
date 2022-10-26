import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {MusicDataInterface} from "./MusicDataInterface";

export interface MusicInterface extends ModelInterface, MusicDataInterface {
	getThumbnail(): Promise<string | undefined>;
}
