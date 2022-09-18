import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";

export class ElementNotFoundError extends RpgError {

	public showErrorMessage(
	): string {
		let response = '';
		if (this.idMap.tag != undefined) response += 'tag: _' + this.idMap.tag + '_\n';
		response += '**The ' + DataType[this.idMap.type] + ' identifier used in the tag does not exist.**\n';

		return response;
	}
}
