import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {AbstractView} from "../../../REFACTOR/views/abstracts/AbstractView";

export abstract class AbstractGalleryModalView extends AbstractView implements GalleryViewInterface {
	private _component: ModelInterface;

	get component(): ModelInterface {
		return this._component;
	}

	set component(component: ModelInterface) {
		this._component = component;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): void;
}
