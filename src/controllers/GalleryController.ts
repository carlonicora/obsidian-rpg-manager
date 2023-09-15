import { AppContext } from "@/contexts/AppContext";
import { App, Modal, Scope } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import GalleryComponent from "src/components/gallery/GalleryComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export class GalleryController extends Modal {
	constructor(private _app: App, private _api: RpgManagerInterface, private _element: ElementInterface) {
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

		const creationComponent = createElement(GalleryComponent, {
			element: this._element,
			key: this._element.version,
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
