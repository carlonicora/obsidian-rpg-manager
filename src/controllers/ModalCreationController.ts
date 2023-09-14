import { AppContext } from "@/contexts/AppContext";
import { App, Modal, Scope, TFile } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import CreationComponent from "src/components/creation/CreationComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { ElementType } from "src/data/enums/ElementType";

export class ModalCreationController extends Modal {
	constructor(
		private _app: App,
		private _api: RpgManagerInterface,
		private _type?: ElementType,
		private _addToCurrentNote: boolean = false
	) {
		super(_app);

		this.scope = new Scope();

		this.scope.register([], "Escape", (evt) => {
			evt.preventDefault();
		});
	}

	onOpen() {
		super.onOpen();

		const { contentEl } = this;
		contentEl.empty();
		const root: Root = createRoot(contentEl);
		this.modalEl.style.width = "var(--modal-max-width)";

		let file: TFile | undefined = undefined;
		if (this._addToCurrentNote) file = this._app.workspace.getActiveFile();

		const creationComponent = createElement(CreationComponent, {
			type: this._type,
			currentNote: file,
			controller: this,
			close: this.close.bind(this),
		});

		const reactComponent = createElement(
			AppContext.Provider,
			{ value: this._app },
			createElement(ApiContext.Provider, { value: this._api }, creationComponent)
		);
		//const reactComponent = createElement(ApiContext.Provider, { value: this._api }, creationComponent);

		root.render(reactComponent);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		super.onClose();
	}
}
