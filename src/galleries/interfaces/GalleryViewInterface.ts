import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface GalleryViewInterface {
	get component(): ComponentInterface;
	set component(component: ComponentInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
