import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface ComponentOptionsServiceInterface {
	render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void;
}
