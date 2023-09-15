import {
	// App,
	// Component,
	// MarkdownPostProcessorContext,
	// MarkdownRenderChild,
	// editorLivePreviewField,
	// TFile,
	Plugin,
	addIcon,
} from "obsidian";

// import { syntaxTree, tokenClassNodeProp } from "@codemirror/language";
// import { Extension, Range } from "@codemirror/state";
// import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view";
// import { SyntaxNode } from "@lezer/common";
import { RpgManagerInterface } from "./RpgManagerInterface";
import { ElementType } from "./data/enums/ElementType";
// import { AttributeInterface } from "./data/interfaces/AttributeInterface";
import { ElementInterface } from "./data/interfaces/ElementInterface";
import { DatabaseFactory } from "./factories/DatabaseFactory";
import { ServiceFactory } from "./factories/ServiceFactory";
import { InternationalisationService } from "./services/InternationalisationService";
import { PluginServices } from "./services/PluginServices";
import { UpdaterView } from "./services/UpdaterService/views/UpdaterView";
import { taskService } from "./services/taskService/TaskService";
import { TaskServiceInterface } from "./services/taskService/interfaces/TaskServiceInterface";
import {
	RpgManagerSettings,
	RpgManagerSettingsInterface,
	rpgManagerDefaultSettings,
} from "./settings/RpgManagerSettings";
import { OptionView } from "./views/OptionsView";
import { ReadmeView } from "./views/ReadmeView";

export default class RpgManager extends Plugin implements RpgManagerInterface {
	private _database: ElementInterface[] | undefined = undefined;
	private _taskService: TaskServiceInterface;

	settings: RpgManagerSettingsInterface;

	// private _extensions: Extension[];

	get version(): string {
		return this.manifest.version;
	}

	/**
	 * This function is used to get elements from the RPG Manager database.
	 * Depending on the parameters, it will return a single element, an array of elements or undefined.
	 *
	 * @param path 		The path of the element to get.
	 * 					If undefined, it will not limit the result to a single element.
	 * @param campaign 	The campaign of the element to get.
	 * 					If **undefined**, it will limit the result to the global elements,
	 * 					if **null** will return the elements from every campaign in the vault, including the global elements.
	 * @param type		Limits the results to the specified type of element.
	 * @param parent	Limits the results to the children of the specified element.
	 * @returns 		ElementInterface | ElementInterface[] | undefined
	 */
	get(
		path?: string,
		campaign?: ElementInterface,
		type?: ElementType,
		parent?: ElementInterface
	): ElementInterface | ElementInterface[] | undefined {
		if (this._database === undefined) return undefined;

		if (!path && !campaign && !parent) {
			let all: ElementInterface[] = [];

			if (campaign === undefined) {
				all = this._database.filter((element: ElementInterface) => element.campaign === undefined);
			} else if (campaign === null) {
				all = this._database;
			}

			if (!type) return all;

			return all.filter((element: ElementInterface) => element.campaign === undefined && element.type === type);
		}

		const matchesPath = (element: ElementInterface) => path === undefined || element.path === path;
		const matchesCampaign = (element: ElementInterface) =>
			campaign === undefined || element.path === campaign.path || element.campaignPath === campaign.path;

		if (path !== undefined) return this._database.find(matchesPath);

		if (path === undefined && type === undefined && parent === undefined) {
			return this._database.filter(matchesCampaign);
		}

		const matchesType = (element: ElementInterface) => type === undefined || element.type === type;
		const matchesParent = (element: ElementInterface) => parent === undefined || element.parentPath === parent.path;

		const isMatchingElement = (element: ElementInterface) =>
			matchesCampaign(element) && matchesPath(element) && matchesType(element) && matchesParent(element);

		return this._database.filter(isMatchingElement);
	}

	/**
	 * This function is used to get the task service.
	 * @returns TaskServiceInterface
	 */
	get tasks(): TaskServiceInterface {
		return this._taskService;
	}

	async onload() {
		await this.loadSettings();
		addIcon(
			"d20",
			'<g cx="50" cy="50" r="50" fill="currentColor" g transform="translate(0.000000,0.000000) scale(0.018)" stroke="none"><path d="M1940 4358 l-612 -753 616 -3 c339 -1 893 -1 1232 0 l616 3 -612 753 c-337 413 -616 752 -620 752 -4 0 -283 -339 -620 -752z"/><path d="M1180 4389 c-399 -231 -731 -424 -739 -428 -9 -6 3 -17 40 -38 30 -17 152 -87 271 -156 l217 -126 476 585 c261 321 471 584 467 583 -4 0 -333 -189 -732 -420z"/><path d="M3676 4225 c457 -562 477 -585 498 -572 11 8 133 78 269 157 l249 143 -29 17 c-62 39 -1453 840 -1458 840 -2 0 210 -263 471 -585z"/><path d="M281 2833 c0 -472 4 -849 8 -838 24 58 520 1362 523 1373 3 12 -168 116 -474 291 l-58 32 1 -858z"/><path d="M4571 3536 c-145 -84 -264 -156 -264 -160 -1 -4 118 -320 263 -701 l265 -694 3 430 c1 237 1 621 0 854 l-3 424 -264 -153z"/><path d="M1272 3290 c7 -20 1283 -2229 1288 -2229 5 0 1281 2209 1288 2229 2 7 -451 10 -1288 10 -837 0 -1290 -3 -1288 -10z"/><path d="M1025 3079 c-2 -8 -158 -416 -345 -906 -187 -491 -340 -897 -340 -903 0 -5 4 -10 8 -10 5 0 415 -65 913 -145 497 -80 928 -149 957 -154 l52 -8 -23 41 c-85 150 -1202 2083 -1208 2090 -5 6 -10 3 -14 -5z"/><path d="M3470 2028 c-337 -585 -614 -1066 -616 -1069 -2 -3 7 -4 19 -2 12 2 445 71 962 154 517 82 941 152 943 154 3 2 -1 19 -7 37 -33 93 -675 1774 -681 1781 -4 4 -283 -471 -620 -1055z"/><path d="M955 842 c17 -11 336 -196 710 -412 374 -216 695 -401 713 -412 l32 -20 0 314 0 314 -707 113 c-390 62 -724 115 -743 118 l-35 5 30 -20z"/><path d="M3428 741 l-718 -116 0 -313 0 -314 33 20 c17 11 347 201 732 422 385 222 704 407 710 412 16 14 -22 8 -757 -111z"/></g>'
		);

		this.registerView("rpg-manager-options", (leaf) => new OptionView(this.app, this, leaf));
		this.registerView("rpg-manager-readme", (leaf) => new ReadmeView(this.app, this, leaf));
		this.registerView("rpg-manager-updater", (leaf) => new UpdaterView(this.app, this, leaf));

		this.addRibbonIcon("d20", "RPG Manager", () => {
			PluginServices.createView(this.app);
		});

		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, rpgManagerDefaultSettings, await this.loadData());
	}

	onunload(): void {
		super.onunload();
		this.app.workspace.detachLeavesOfType("rpg-manager-readme");
	}

	async onLayoutReady() {
		InternationalisationService.loadSettings();

		if ((this.settings as any).previousVersion !== undefined) {
			this.app.workspace.getLeaf(true).setViewState({
				type: "rpg-manager-updater",
				active: true,
			});

			return;
		}

		DatabaseFactory.create(this.app, this).then((database: ElementInterface[]) => {
			this._database = database;

			ServiceFactory.initialise(this.app, this);

			this._taskService = new taskService(this._database);

			console.info("RpgManager " + this.manifest.version + " loaded");
			PluginServices.registerEvents(this.app, this, this._database);

			/*
			this.registerMarkdownPostProcessor(async (el, ctx) => {
				this.inlineAttribute(el, ctx, ctx.sourcePath);
			});

			this._extensions = [inlinePlugin(this.app, this)];
			this.registerEditorExtension(this._extensions);
			*/

			this.app.workspace.trigger("rpgmanager:refresh-views");
		});

		(window["RpgManagerAPI"] = this) && this.register(() => delete window["RpgManagerAPI"]);

		PluginServices.registerProcessors(this.app, this);
		PluginServices.registerCommands(this.app, this);
		this.addSettingTab(new RpgManagerSettings(this.app, this));

		this.app.workspace.detachLeavesOfType("rpg-manager-updater");
		this.app.workspace.detachLeavesOfType("rpg-manager-readme");

		if (this.settings.version !== this.manifest.version) {
			this.settings = { ...this.settings, version: this.manifest.version };
			await this.saveData(this.settings);

			this.app.workspace.getLeaf(true).setViewState({
				type: "rpg-manager-readme",
				active: true,
			});
		}
	}

	/*
	public async inlineAttribute(
		el: HTMLElement,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string
	) {
		const codeblocks = el.querySelectorAll("code");
		for (let index = 0; index < codeblocks.length; index++) {
			const codeblock = codeblocks.item(index);

			const text = codeblock.innerText.trim();
			if (text.startsWith("rpgm")) {
				const code = text.substring(4).trim();
				if (code.length == 0) continue;

				component.addChild(new RpgManagerInlineAttributeRenderer(this.app, this, code, el, codeblock, sourcePath));
			}
		}
	}
	*/
}

/*
export class RpgManagerInlineAttributeFetcher {
	static fetch(api: RpgManagerInterface, path: string, attributeName: string): AttributeInterface | undefined {
		const element: ElementInterface | undefined = api.get(path) as ElementInterface | undefined;
		if (!element) return undefined;
		const attribute: AttributeInterface | undefined = element.attribute(attributeName);
		if (!attribute || !attribute.isSet) return undefined;

		return attribute;
	}
}

export class RpgManagerInlineAttributeRenderer extends MarkdownRenderChild {
	constructor(
		public app: App,
		public api: RpgManagerInterface,
		public script: string,
		public container: HTMLElement,
		public target: HTMLElement,
		public origin: string
	) {
		super(container);
	}

	onload() {
		this.render();

		this.registerEvent(this.app.workspace.on("rpgmanager:refresh-views", this.maybeRefresh));
		this.register(this.container.onNodeInserted(this.maybeRefresh));
	}

	maybeRefresh = () => {
		if (this.container.isShown()) {
			this.render();
		}
	};

	async render() {
		const attribute = RpgManagerInlineAttributeFetcher.fetch(this.api, this.origin, this.script);
		const el = document.createElement("span");

		if (attribute) {
			el.textContent = attribute.value;
		} else {
			el.textContent = this.script;
		}

		this.target.replaceWith(el);
		this.target = el;
	}
}

class RpgManagerInlineWidget extends WidgetType {
	constructor(private _el: HTMLElement) {
		super();
	}

	toDOM(view: EditorView): HTMLElement {
		return this._el;
	}
}

export function inlinePlugin(app: App, api: RpgManagerInterface) {
	return ViewPlugin.fromClass(
		class {
			decorations: DecorationSet;
			component: Component;

			constructor(view: EditorView) {
				this.component = new Component();
				this.component.load();
				this.decorations = this.inlineRender(view) ?? Decoration.none;
			}

			update(update: ViewUpdate) {
				if (!update.state.field(editorLivePreviewField)) {
					this.decorations = Decoration.none;
					return;
				}
				if (update.docChanged) {
					this.decorations = this.decorations.map(update.changes);
					this.updateTree(update.view);
				} else if (update.selectionSet) {
					this.updateTree(update.view);
				} else if (update.viewportChanged) {
					this.decorations = this.inlineRender(update.view) ?? Decoration.none;
				}
			}

			updateTree(view: EditorView) {
				for (const { from, to } of view.visibleRanges) {
					syntaxTree(view.state).iterate({
						from,
						to,
						enter: ({ node }) => {
							if (this.renderNode(view, node)) {
								this.addDeco(node, view);
							} else {
								this.removeDeco(node);
							}
						},
					});
				}
			}

			removeDeco(node: SyntaxNode) {
				this.decorations.between(node.from - 1, node.to + 1, (from, to, value) => {
					this.decorations = this.decorations.update({
						filterFrom: from,
						filterTo: to,
						filter: (from, to, value) => false,
					});
				});
			}

			addDeco(node: SyntaxNode, view: EditorView) {
				const from = node.from - 1;
				const to = node.to + 1;
				let exists = false;
				this.decorations.between(from, to, (from, to, value) => {
					exists = true;
				});
				if (!exists) {
					const currentFile = app.workspace.getActiveFile();
					if (!currentFile) return;
					const newDeco = this.renderWidget(node, view, currentFile)?.value;
					if (newDeco) {
						this.decorations = this.decorations.update({
							add: [{ from: from, to: to, value: newDeco }],
						});
					}
				}
			}

			renderNode(view: EditorView, node: SyntaxNode) {
				const type = node.type;
				const tokenProps = type.prop<string>(tokenClassNodeProp);
				const props = new Set(tokenProps?.split(" "));
				if (!props.has("inline-code") || props.has("formatting")) return true;

				for (const range of view.state.selection.ranges) {
					if (range.from <= node.to + 1 && range.to >= node.from - 1) {
						return false;
					}
				}

				return true;
			}

			inlineRender(view: EditorView) {
				const currentFile = app.workspace.getActiveFile();
				if (!currentFile) return;

				const widgets: Range<Decoration>[] = [];
				for (const { from, to } of view.visibleRanges) {
					syntaxTree(view.state).iterate({
						from,
						to,
						enter: ({ node }) => {
							if (!this.renderNode(view, node)) return;

							const widget = this.renderWidget(node, view, currentFile);
							if (widget) widgets.push(widget);
						},
					});
				}

				return Decoration.set(widgets, true);
			}

			renderWidget(node: SyntaxNode, view: EditorView, currentFile: TFile) {
				const start = node.from;
				const end = node.to;

				if (view.state.doc.sliceString(end, end + 1) === "\n") return;

				const text = view.state.doc.sliceString(start, end);

				if (!text.startsWith("rpgm")) return;

				const attribute = RpgManagerInlineAttributeFetcher.fetch(api, currentFile.path, text.substring(4).trim());
				if (!attribute) return;

				const el = createSpan();
				el.appendText(attribute.value);

				return Decoration.replace({
					widget: new RpgManagerInlineWidget(el),
					inclusive: false,
					block: false,
				}).range(start - 1, end + 1);
			}

			destroy() {
				this.component.unload();
			}
		},
		{ decorations: (v) => v.decorations }
	);
}
*/
