import {
	Component, debounce,
	MarkdownPostProcessorContext,
	Plugin,
} from 'obsidian';

import {RpgFunctions} from "./data/RpgFunctions";
import {RpgViewFactory} from "./factories/RpgViewFactory";

export default class RpgManager extends Plugin {
	private functions: RpgFunctions;
	private areFunctionsLoaded : boolean = false;

	async onload() {
		console.log('Loading RpgManager ' + this.manifest.version);

		this.refreshViews = debounce(this.refreshViews, 500, true) as unknown as () => Promise<void>

		this.registerEvent(this.app.metadataCache.on('resolved', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerEvent(this.app.vault.on('modify', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerEvent(this.app.workspace.on('layout-change', (function(){
			this.refreshViews();
		}).bind(this)));

		this.registerPriorityCodeblockPostProcessor("RpgManager", -100, async (source: string, el, ctx) =>
			this.createRpgView(source, el, ctx, ctx.sourcePath)
		);
	}

	refreshViews(){
		this.app.workspace.trigger("rpgmanager:refresh-views");
	}

	public async createRpgView(
		source: string,
		el: HTMLElement,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string
	) {
		if (!this.areFunctionsLoaded){
			this.areFunctionsLoaded = true;

			this.functions = this.addChild(
				RpgFunctions.create(this.app)
			);
		}

		//@ts-ignore
		this.app.plugins.plugins.dataview.api.index.touch();

		component.addChild(RpgViewFactory.create(this.functions, this.app, el, source, component, sourcePath));
	}

	/** Register a markdown codeblock post processor with the given priority. */
	public registerPriorityCodeblockPostProcessor(
		language: string,
		priority: number,
		processor: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
	) {
		const registered = this.registerMarkdownCodeBlockProcessor(language, processor);
		registered.sortOrder = priority;
	}

	/** Register a markdown post processor with the given priority. */
	public registerPriorityMarkdownPostProcessor(
		priority: number,
		processor: (el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
	) {
		const registered = this.registerMarkdownPostProcessor(processor);
		registered.sortOrder = priority;
	}
}
