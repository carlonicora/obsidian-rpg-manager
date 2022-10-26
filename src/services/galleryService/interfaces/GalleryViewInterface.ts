import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface GalleryViewInterface {
	get component(): ModelInterface;
	set component(component: ModelInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
