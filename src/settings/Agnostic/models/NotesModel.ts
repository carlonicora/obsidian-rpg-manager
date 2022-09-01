import {AbstractModel} from "../../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../../interfaces/response/ResponseDataInterface";

export class NotesModel extends AbstractModel {
	generateData(): ResponseDataInterface {
		return this.data;
	}

	/*
	public async render() {

	}

	 */
}
