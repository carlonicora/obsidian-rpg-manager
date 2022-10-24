import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {LocationDataInterface} from "./LocationDataInterface";

export interface LocationInterface extends ComponentModelInterface, LocationDataInterface {
	get address(): string | undefined;
}
