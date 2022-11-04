import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface BreadcrumbServiceInterface {
	render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void;
}
