import {ImageViewInterface} from "../interfaces/ImageViewInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {AbstractView} from "../../views/abstracts/AbstractView";

export abstract class AbstractImageModalView extends AbstractView implements ImageViewInterface {
	protected _component: ComponentInterface;

	set component(component: ComponentInterface) {
		this._component = component;
	}

	abstract render(
		containerEl: HTMLDivElement,
	): void;
}
