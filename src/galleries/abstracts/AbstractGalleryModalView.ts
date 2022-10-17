import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {AbstractView} from "../../views/abstracts/AbstractView";

export abstract class AbstractGalleryModalView extends AbstractView implements GalleryViewInterface {
	private _component: ComponentInterface;

	get component(): ComponentInterface {
		return this._component;
	}

	set component(component: ComponentInterface) {
		this._component = component;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): void;
}
