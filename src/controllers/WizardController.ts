import ChapterWizardComponent from "@/components/wizards/chapters/ChapterWizardComponent";
import { ElementType } from "@/data/enums/ElementType";
import { App, Modal, Scope } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import NonPlayerCharacterWizardComponent from "src/components/wizards/npcs/NonPlayerCharacterWizardComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { WizardContext } from "src/contexts/WizardContext";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export class WizardController extends Modal {
	constructor(private _app: App, private _api: RpgManagerInterface, private _element: ElementInterface) {
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

		let wizardComponent: React.ReactElement;
		if (this._element.type === ElementType.NonPlayerCharacter) {
			wizardComponent = createElement(NonPlayerCharacterWizardComponent, {
				element: this._element,
				close: this.close.bind(this),
			});
		} else if (this._element.type === ElementType.Chapter) {
			wizardComponent = createElement(ChapterWizardComponent, {
				element: this._element,
				close: this.close.bind(this),
			});
		}

		const wizardProvider = createElement(WizardContext.Provider, { value: {} }, wizardComponent);
		const reactComponent = createElement(ApiContext.Provider, { value: this._api }, wizardProvider);

		root.render(reactComponent);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		super.onClose();
	}
}
