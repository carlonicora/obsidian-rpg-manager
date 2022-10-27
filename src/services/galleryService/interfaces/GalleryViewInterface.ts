import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export interface GalleryViewInterface {
	get model(): ModelInterface;
	set model(model: ModelInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
