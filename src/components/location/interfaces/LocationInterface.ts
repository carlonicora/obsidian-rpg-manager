import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {LocationDataInterface} from "./LocationDataInterface";

export interface LocationInterface extends ModelInterface, LocationDataInterface {
	get address(): string | undefined;
}
