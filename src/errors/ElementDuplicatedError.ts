import {AbstractRpgError} from "../abstracts/AbstractRpgError";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {App} from "obsidian";
import {IdInterface} from "../interfaces/data/IdInterface";

export class ElementDuplicatedError extends AbstractRpgError {
	constructor(
		app: App,
		idMap: IdInterface,
		private duplication: Array<RecordInterface>,
		private duplicated: RecordInterface|undefined=undefined,
	) {
		super(app, idMap);
	}

	public getErrorTitle(
	): string|undefined {
		return 'Duplicated outline id';
	}

	public showErrorMessage(
	): string {
		let response = this.id.tag + '\n';

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

	public showErrorActions(
	): string {
		const response = 'Two or more outlines have the same tag. The identifier of the outline must be unique\nPlease change one of the following:\n';

		return response;
	}

	public getErrorLinks(
	): Array<string>|undefined {
		const response: Array<string> = [];

		if (this.duplication.length > 1) {
			this.duplication.forEach((record: RecordInterface) => {
				response.push(record.path);
			})
		} else if (this.duplicated !== undefined) {
			response.push(this.duplication[0].path);
			response.push(this.duplicated?.path);
		}

		return response;
	}
}
