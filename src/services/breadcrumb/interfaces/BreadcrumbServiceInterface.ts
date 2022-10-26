import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbServiceInterface {
	render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void;
}
