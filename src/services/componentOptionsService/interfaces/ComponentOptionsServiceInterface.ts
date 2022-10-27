import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface ComponentOptionsServiceInterface {
	render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void;
}
