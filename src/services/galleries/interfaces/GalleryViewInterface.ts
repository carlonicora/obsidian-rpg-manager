import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface GalleryViewInterface {
	get component(): ComponentModelInterface;
	set component(component: ComponentModelInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
