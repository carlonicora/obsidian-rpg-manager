import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";

export class ElementNotFoundError extends RpgError {
	public showErrorMessage(
	): string {
		let response = super.showErrorMessage();
		if (this.tag != undefined) response += 'tag: _' + this.tag + '_\n';
		response += '**The ' + DataType[this.type] + ' identifier used in the tag does not exist.**\n';

		return response;
	}
}
