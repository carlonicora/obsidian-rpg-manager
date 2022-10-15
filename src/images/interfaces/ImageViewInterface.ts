import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface ImageViewInterface {
	set component(component: ComponentInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
