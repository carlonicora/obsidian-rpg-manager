import {ViewInterface} from "../interfaces/ViewInterface";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";
import {EditorSelector} from "../../../core/helpers/EditorSelector";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

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
		currentComponent: ComponentModelInterface,
		identifier: string,
	): void {
		this._createEditorButton(cellEl).addEventListener('click', () => {
			this.factories.editableContent.open(currentComponent, identifier)
				.then((opened: boolean) => {
					if (!opened)
						EditorSelector.focusOnDataKey(this.app, currentComponent, identifier);
				});
		});
	}

	public addRelationshipEditorIcon(
		cellEl: HTMLTableCellElement,
		currentComponent: ComponentModelInterface,
		identifier: string,
	): void {
		this._createEditorButton(cellEl).addEventListener('click', () => {
			this.factories.editableContent.open(currentComponent, identifier)
				.then((modalOpened: boolean) => {
					if (!modalOpened)
						EditorSelector.focusOnDataRelationshipDescription(this.app, currentComponent, identifier);

				});
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
