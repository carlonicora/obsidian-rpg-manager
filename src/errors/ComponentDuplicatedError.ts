import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {App} from "obsidian";
import {IdInterface} from "../id/interfaces/IdInterface";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";

export class ComponentDuplicatedError extends AbstractRpgManagerError {
	constructor(
		app: App,
		idMap: IdInterface,
		private _duplication: ComponentInterface[],
		private _duplicated: ComponentInterface|undefined=undefined,
	) {
		super(app, idMap);
	}

	public getErrorTitle(
	): string|undefined {
		return 'Duplicated outline id';
	}

	public showErrorMessage(
	): string {
		let response = ''; //this.id.tag + '\n';

		if (this._duplication.length > 1) {
			this._duplication.forEach((component: ComponentInterface) => {
				response += ' - ' + component.file.basename + '\n';
			})
		} else if (this._duplicated !== undefined) {
			response += ' - ' + this._duplication[0].file.basename + '\n' +
				' - ' + this._duplicated?.file.basename + '\n';
		}

		return response;
	}

	public showErrorActions(
	): string {
		const response = 'Two or more outlines have the same tag. The identifier of the outline must be unique\nPlease change one of the following:\n';

		return response;
	}

	public getErrorLinks(
	): string[]|undefined {
		const response: string[] = [];

		if (this._duplication.length > 1) {
			this._duplication.forEach((component: ComponentInterface) => {
				response.push(component.file.path);
			})
		} else if (this._duplicated !== undefined) {
			response.push(this._duplication[0].file.path);
			response.push(this._duplicated?.file.path);
		}

		return response;
	}
}
