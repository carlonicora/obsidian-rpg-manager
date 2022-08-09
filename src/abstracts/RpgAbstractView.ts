import {App, Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";
import {RpgFunctions} from "../data/RpgFunctions";
import {RpgMetadataValidator} from "../data/RpgMetadataValidator";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {RpgComponentFactory} from "../factories/RpgComponentFactory";

export abstract class RpgAbstractView extends MarkdownRenderChild {
	protected dv: DataviewInlineApi;
	protected renderer: RpgComponentFactory;

	constructor(
		protected functions: RpgFunctions,
		protected app: App,
		protected container: HTMLElement,
		private source: string,
		private component: Component | MarkdownPostProcessorContext,
		private sourcePath: string,
	) {
		super(container);
	}

	abstract render(): Promise<void>;

	private async renderComponent(wait = 500){
		const activeLeaf = this.app.workspace.activeLeaf;
		setTimeout(() => {
			//@ts-ignore
			this.dv = this.app.plugins.plugins.dataview.localApi(this.sourcePath, this.component, this.container);
			this.renderer = new RpgComponentFactory(this.functions, this.dv);

			if (RpgMetadataValidator.validate(this.source, this.dv.current()?.file.frontmatter)) {
				this.container.innerHTML = '';

				this.render();
			}
		}, wait);
	}

	onload() {
		this.renderComponent(0);
		//@ts-ignore
		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.redrawContainer));
		this.register(this.container.onNodeInserted(this.redrawContainer));
	}

	redrawContainer = () => {
		if (this.isActivePage()) {
			this.renderComponent();
		}
	};

	private isActivePage(): boolean {
		const views = this.app.workspace.getLayout().main.children;

		for (let viewCounter = 0; viewCounter < views.length; viewCounter++){
			if (
				views[viewCounter].state?.state?.file !== undefined &&
				views[viewCounter].state?.state?.file === this.sourcePath
			){
				return true;
			}
		}

		return false;
	}
}
