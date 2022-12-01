import {AbstractElement} from "../../../../managers/viewsManager/abstracts/AbstractElement";
import {DateService} from "../../../../services/dateService/DateService";
import {ElementDataInterface} from "../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {SceneInterface} from "../../interfaces/SceneInterface";

export class FeedbackElement extends AbstractElement {
	private _scene: SceneInterface;

	render(
		data: ElementDataInterface,
		containerEl: HTMLElement
	) {
		this._scene = data.model as SceneInterface;
		containerEl.createEl('h2', {text: data.title});


	}
}
