import {RpgError} from "./RpgError";
import {DataType} from "../enums/DataType";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App} from "obsidian";
import {TagValidator} from "../helpers/TagValidator";

export class ElementDuplicatedError extends RpgError {
	constructor(
		app: App,
		idMap: TagValidator,
		private duplication: Array<RecordInterface>,
		private duplicated: RecordInterface|undefined=undefined,
	) {
		super(app, idMap);
	}

	public getErrorTitle(
	): string|undefined {
		return 'More than one element with the same id exists in the database';
	}

	public showErrorMessage(
	): string {
		let response = this.idMap.tag + '\n';

		if (this.duplication.length > 1) {
			this.duplication.forEach((record: RecordInterface) => {
				response += ' - ' + record.basename + '\n';
			})
		} else if (this.duplicated !== undefined) {
			response += ' - ' + this.duplication[0].basename + '\n' +
				' - ' + this.duplicated?.basename + '\n';
		}

		return response;
	}
}
