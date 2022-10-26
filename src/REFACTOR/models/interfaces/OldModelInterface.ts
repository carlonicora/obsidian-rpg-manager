import {ResponseDataInterface} from "../../../responses/interfaces/ResponseDataInterface";

export interface OldModelInterface {
	generateData(
	): Promise<ResponseDataInterface>;
}
