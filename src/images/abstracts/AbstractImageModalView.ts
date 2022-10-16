import {ImageViewInterface} from "../interfaces/ImageViewInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {AbstractView} from "../../views/abstracts/AbstractView";

export abstract class AbstractImageModalView extends AbstractView implements ImageViewInterface {
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
