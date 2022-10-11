import {ViewInterface} from "../interfaces/ViewInterface";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {EditorSelector} from "../../helpers/EditorSelector";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export abstract class AbstractSubModelView extends AbstractRpgManager implements ViewInterface {
	constructor(
		app: App,
		protected sourcePath: string,
	) {
		super(app);
	}

	public abstract render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;

	public addEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentInterface,
		identifier: string,
	): void {

		this._createEditorButton(cellEl).addEventListener('click', () => {
			EditorSelector.focusOnDataKey(this.app, currentComponent, identifier);
		});
	}

	public addRelationshipEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentInterface,
		identifier: string,
	): void {
		this._createEditorButton(cellEl).addEventListener('click', () => {
			EditorSelector.focusOnDataRelationshipDescription(this.app, currentComponent, identifier);
		});
	}

	private _createEditorButton(
		containerEl: HTMLTableCellElement,
	): HTMLSpanElement {
		containerEl.addClass('editable');
		const response = document.createElement('span');
		response.addClass('editorIcon');
		response.textContent = '</>';
		containerEl.prepend(response);

		return response;
	}
}
