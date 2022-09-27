import {ComponentInterface} from "../database/ComponentInterface";

export interface LocationInterface extends ComponentInterface {
	address: string|null;
}
