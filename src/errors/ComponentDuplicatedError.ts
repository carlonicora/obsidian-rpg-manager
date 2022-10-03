import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {App} from "obsidian";
import {IdInterface} from "../interfaces/IdInterface";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";

export class ComponentDuplicatedError extends AbstractRpgManagerError {
	constructor(
		app: App,
		idMap: IdInterface,
		private duplication: Array<ComponentInterface>,
		private duplicated: ComponentInterface|undefined=undefined,
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
			this.duplication.forEach((component: ComponentInterface) => {
				response += ' - ' + component.file.basename + '\n';
			})
		} else if (this.duplicated !== undefined) {
			response += ' - ' + this.duplication[0].file.basename + '\n' +
				' - ' + this.duplicated?.file.basename + '\n';
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
			this.duplication.forEach((component: ComponentInterface) => {
				response.push(component.file.path);
			})
		} else if (this.duplicated !== undefined) {
			response.push(this.duplication[0].file.path);
			response.push(this.duplicated?.file.path);
		}

		return response;
	}
}
