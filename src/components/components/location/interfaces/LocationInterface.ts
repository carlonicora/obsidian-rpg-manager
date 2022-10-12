import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {LocationDataInterface} from "./LocationDataInterface";

export interface LocationInterface extends ComponentInterface, LocationDataInterface {
	get address(): string | undefined;
}
