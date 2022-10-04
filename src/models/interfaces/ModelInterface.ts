import {ResponseDataInterface} from "../../responses/interfaces/ResponseDataInterface";

export interface ModelInterface {
	generateData(
	): Promise<ResponseDataInterface>;
}
