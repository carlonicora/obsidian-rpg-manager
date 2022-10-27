import {IdInterface} from "../../services/idService/interfaces/IdInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class ComponentDuplicatedError extends AbstractRpgManagerError {
	constructor(
		api: RpgManagerApiInterface,
		idMap: IdInterface,
		private _duplication: ModelInterface[],
		private _duplicated: ModelInterface|undefined=undefined,
	) {
		super(api, idMap);
	}

	public getErrorTitle(
	): string|undefined {
		return 'Duplicated outline idService';
	}

	public showErrorMessage(
	): string {
		let response = ''; //this.idService.tag + '\n';

		if (this._duplication.length > 1) {
			this._duplication.forEach((component: ModelInterface) => {
				response += ' - ' + component.file.basename + '\n';
			});
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
			this._duplication.forEach((component: ModelInterface) => {
				response.push(component.file.path);
			});
		} else if (this._duplicated !== undefined) {
			response.push(this._duplication[0].file.path);
			response.push(this._duplicated?.file.path);
		}

		return response;
	}
}
