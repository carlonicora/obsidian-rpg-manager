import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../../../data/responses/ResponseData";
import {NoteInterface} from "../../../interfaces/data/NoteInterface";

export class NotesModel extends AbstractModel {
	protected currentElement: NoteInterface;

	generateData(
	): ResponseDataInterface {
		const response = new ResponseData();
		return response;
	}
}
