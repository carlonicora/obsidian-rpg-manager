import NewTaskComponent from "@/components/tasks/NewTaskComponent";
import { ApiContext } from "@/contexts/ApiContext";
import { AppContext } from "@/contexts/AppContext";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { TaskInterface } from "@/services/taskService/interfaces/TaskInterface";
import { App, Modal } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";


export class NewTaskController extends Modal {
	constructor(
		private _app: App,
		private _api: RpgManagerInterface,
		private _element?: ElementInterface | undefined,
	) {
		super(_app);
	}
	onOpen() {
		super.onOpen();

		const { contentEl } = this;
		contentEl.empty();
		const root: Root = createRoot(contentEl);
		this.modalEl.style.width = "var(--modal-max-width)";

		const handleSave = (task: TaskInterface) => {
			const codeblockService = new RpgManagerCodeblockService(this._app, this._api, this._element.file);
			codeblockService.addOrUpdateTask(task);
			this.close();
		};

		const creationComponent = createElement(NewTaskComponent, {
			element: this._element,
			onTaskCreation: handleSave,
		});
		const reactComponent = createElement(
			AppContext.Provider,
			{ value: this._app },
			createElement(ApiContext.Provider, { value: this._api }, creationComponent)
		);

		root.render(reactComponent);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		super.onClose();
	}
}
