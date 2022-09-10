import {ResponseDataInterface} from "./response/ResponseDataInterface";

export interface ModelInterface {
	generateData(
	): Promise<ResponseDataInterface>;
}
