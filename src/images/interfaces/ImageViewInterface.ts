import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface ImageViewInterface {
	get component(): ComponentInterface;
	set component(component: ComponentInterface);

	render(
		containerEl: HTMLDivElement,
	): void;
}
