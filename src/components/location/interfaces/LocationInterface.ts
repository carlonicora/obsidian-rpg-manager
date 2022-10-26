import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {LocationDataInterface} from "./LocationDataInterface";

export interface LocationInterface extends ModelInterface, LocationDataInterface {
	get address(): string | undefined;
}
