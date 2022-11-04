import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AbstractView} from "../../../managers/viewsManager/abstracts/AbstractView";

export abstract class AbstractGalleryModalView extends AbstractView implements GalleryViewInterface {
	private _model: ModelInterface;

	get model(): ModelInterface {
		return this._model;
	}

	set model(model: ModelInterface) {
		this._model = model;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): void;
}
