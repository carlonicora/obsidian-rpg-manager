import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {LocationDataInterface} from "./data/LocationDataInterface";

export interface LocationInterface extends ComponentInterface, LocationDataInterface {
	get address(): string | undefined;
}
