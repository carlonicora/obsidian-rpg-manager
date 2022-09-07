import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";

export class NotesModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		const response = new ResponseData();
		return response;
	}
}
