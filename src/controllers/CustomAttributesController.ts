import { Modal, Scope } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import CustomAttributesComponent from "src/components/custom/CustomAttributesComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export class CustomAttributesController extends Modal {
	constructor(private _api: RpgManagerInterface, private _element?: ElementInterface) {
		super(app);

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

		const creationComponent = createElement(CustomAttributesComponent, {
			element: this._element,
		});
		const reactComponent = createElement(ApiContext.Provider, { value: this._api }, creationComponent);

		root.render(reactComponent);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		super.onClose();
	}
}
