import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {AbstractView} from "../../../REFACTOR/views/abstracts/AbstractView";

export abstract class AbstractGalleryModalView extends AbstractView implements GalleryViewInterface {
	private _component: ComponentModelInterface;

	get component(): ComponentModelInterface {
		return this._component;
	}

	set component(component: ComponentModelInterface) {
		this._component = component;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): void;
}
