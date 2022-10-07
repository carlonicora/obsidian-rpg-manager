import {
	addIcon,
	Component,
	MarkdownPostProcessorContext,
	MarkdownView,
	Plugin,
	WorkspaceLeaf
} from 'obsidian';
import {Controller} from "./Controller";
import {ComponentType} from "./databases/enums/ComponentType";
import {Factories} from "./factories/Factories";
import {CreationModal} from "./modals/CreationModal";
import {RpgManagerDefaultSettings, RpgManagerSettingsInterface} from "./settings/RpgManagerSettingsInterface";
import {RpgManagerSettings} from "./settings/RpgManagerSettings";
import {RpgManagerInterface} from "./interfaces/RpgManagerInterface";
import {ErrorView} from "./views/ErrorView";
import {ViewType} from "./views/enums/ViewType";
import {DatabaseUpdater} from "./databases/updaters/DatabaseUpdater";
import {ReleaseNoteView} from "./views/ReleaseNoteView";
import {FactoriesInterface} from "./factories/interfaces/FactoriesInterface";
import {TagHelper} from "./databases/TagHelper";
import {RPGManagerView} from "./views/RPGManagerView";
import {TimelineView} from "./views/TimelineView";
import {ManipulatorsInterface} from "./manipulators/interfaces/ManipulatorsInterface";
import {Manipulators} from "./manipulators/Manipulators";
import {DatabaseInterface} from "./databases/interfaces/DatabaseInterface";
import {ComponentInterface} from "./databases/interfaces/ComponentInterface";
import {DatabaseInitialiser} from "./databases/DatabaseInitialiser";
import {SceneInterface} from "./databases/components/interfaces/SceneInterface";
import {UpdaterModal} from "./modals/UpdaterModal";

export default class RpgManager extends Plugin implements RpgManagerInterface{
	private isVersionUpdated=false;
	settings: RpgManagerSettingsInterface;
	database: DatabaseInterface;
	factories: FactoriesInterface;
	manipulators: ManipulatorsInterface;
	tagHelper: TagHelper;
	version: string;

	ready = false;

	async onload() {
		this.version = this.manifest.version;
		this.factories = await new Factories(this.app);
		this.manipulators = await new Manipulators(this.app);

		console.info('Loading RpgManager ' + this.manifest.version);

		await this.loadSettings();
		this.addSettingTab(new RpgManagerSettings(this.app));

		this.tagHelper = await new TagHelper(this.settings);

		await addIcon('d20', '<g cx="50" cy="50" r="50" fill="currentColor" g transform="translate(0.000000,0.000000) scale(0.018)" stroke="none"><path d="M1940 4358 l-612 -753 616 -3 c339 -1 893 -1 1232 0 l616 3 -612 753 c-337 413 -616 752 -620 752 -4 0 -283 -339 -620 -752z"/><path d="M1180 4389 c-399 -231 -731 -424 -739 -428 -9 -6 3 -17 40 -38 30 -17 152 -87 271 -156 l217 -126 476 585 c261 321 471 584 467 583 -4 0 -333 -189 -732 -420z"/><path d="M3676 4225 c457 -562 477 -585 498 -572 11 8 133 78 269 157 l249 143 -29 17 c-62 39 -1453 840 -1458 840 -2 0 210 -263 471 -585z"/><path d="M281 2833 c0 -472 4 -849 8 -838 24 58 520 1362 523 1373 3 12 -168 116 -474 291 l-58 32 1 -858z"/><path d="M4571 3536 c-145 -84 -264 -156 -264 -160 -1 -4 118 -320 263 -701 l265 -694 3 430 c1 237 1 621 0 854 l-3 424 -264 -153z"/><path d="M1272 3290 c7 -20 1283 -2229 1288 -2229 5 0 1281 2209 1288 2229 2 7 -451 10 -1288 10 -837 0 -1290 -3 -1288 -10z"/><path d="M1025 3079 c-2 -8 -158 -416 -345 -906 -187 -491 -340 -897 -340 -903 0 -5 4 -10 8 -10 5 0 415 -65 913 -145 497 -80 928 -149 957 -154 l52 -8 -23 41 c-85 150 -1202 2083 -1208 2090 -5 6 -10 3 -14 -5z"/><path d="M3470 2028 c-337 -585 -614 -1066 -616 -1069 -2 -3 7 -4 19 -2 12 2 445 71 962 154 517 82 941 152 943 154 3 2 -1 19 -7 37 -33 93 -675 1774 -681 1781 -4 4 -283 -471 -620 -1055z"/><path d="M955 842 c17 -11 336 -196 710 -412 374 -216 695 -401 713 -412 l32 -20 0 314 0 314 -707 113 c-390 62 -724 115 -743 118 l-35 5 30 -20z"/><path d="M3428 741 l-718 -116 0 -313 0 -314 33 20 c17 11 347 201 732 422 385 222 704 407 710 412 16 14 -22 8 -757 -111z"/></g>');
		//await addIcon('pieEighth', '<g transform="translate(1.000000,0.000000) scale(5)"><circle r="10" cx="10" cy="10" fill="white" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="black" stroke-width="10" stroke-dasharray="calc(12.5 * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></g>');
		await addIcon('pieEighth', '<g transform="translate(3.000000,3.000000) scale(4.75)"><circle r="10" cx="10" cy="10" fill="transparent" stroke="black" stroke-width="0.5"/><circle r="5" cx="10" cy="10" fill="transparent" stroke="black" stroke-width="10" stroke-dasharray="calc(12.5 * 31.4 / 100) 31.4" transform="rotate(-90) translate(-20)" /></g>');
		await addIcon('openClose', '<g transform="translate(40.000000,40.000000) scale(0.06)"><path d="M207,990V10L793,500.8L207,990L207,990z"/></g>')
		this.registerView(ViewType.Errors.toString(), (leaf) => new ErrorView(this.app, leaf));
		this.registerView(ViewType.ReleaseNote.toString(), (leaf) => new ReleaseNoteView(this.app, leaf));
		this.registerView(ViewType.RPGManager.toString(), (leaf) => new RPGManagerView(this.app, leaf));
		this.registerView(ViewType.Timeline.toString(), (leaf) => new TimelineView(this.app, leaf));

		this.addRibbonIcon('d20', 'RPG Manager', () => {
			this.factories.views.showObsidianView(
				ViewType.RPGManager,
			)
		});

		app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
	}

	async onLayoutReady(){
		this.app.workspace.detachLeavesOfType(ViewType.Errors.toString());
		this.app.workspace.detachLeavesOfType(ViewType.ReleaseNote.toString());
		this.app.workspace.detachLeavesOfType(ViewType.RPGManager.toString());
		this.app.workspace.detachLeavesOfType(ViewType.Timeline.toString());

		let requiresUpdate = false;
		if (this.settings.previousVersion !== this.manifest.version){
			const databaseUpdater = await new DatabaseUpdater(this.app, this, this.settings.previousVersion, this.manifest.version);

			if (databaseUpdater.requiresDatabaseUpdate()) {
				requiresUpdate = true;
				new UpdaterModal(this.app, databaseUpdater).open();

			}
		}

		if (!requiresUpdate) this.initialise();
	}

	public async initialise(
	): Promise<void> {
		const reloadStart = Date.now();

		this.registerCodeBlock();
		this.registerCommands();

		DatabaseInitialiser.initialise(this.app)
			.then((database: DatabaseInterface) => {
				this.database = database;
				console.info(this.database);
				this.factories.runningTimeManager.updateMedianTimes(true);

				this.registerEvents();

				this.app.workspace.trigger("rpgmanager:refresh-views");

				this.app.workspace.on('active-leaf-change', (leaf: WorkspaceLeaf) => {
					if (this.factories.runningTimeManager.isTimerRunning) {
						let isCurrentlyRunningSceneOpen = false;
						this.app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
							if (leaf.view instanceof MarkdownView) {
								const file = leaf.view?.file;
								if (file !== undefined) {
									const component: ComponentInterface|undefined = this.database.readByPath(file.path);
									if (
										component !== undefined &&
										component.id.type === ComponentType.Scene &&
										this.factories.runningTimeManager.isCurrentlyRunningScene(<SceneInterface>component)
									) {
										isCurrentlyRunningSceneOpen = true;
									}
								}
							}
						});

						if (!isCurrentlyRunningSceneOpen && this.factories.runningTimeManager.currentlyRunningScene !== undefined){
							this.factories.runningTimeManager.stopScene(this.factories.runningTimeManager.currentlyRunningScene);
						}

					}
				});


				console.info(
					`RPG Manager: ${this.database.recordset.length} outlines and elements have been indexed in ${
						(Date.now() - reloadStart) / 1000.0
					}s.`
				);

				if (this.isVersionUpdated) {
					this.factories.views.showObsidianView(ViewType.ReleaseNote);
				} else {
					this.app.workspace.detachLeavesOfType(ViewType.ReleaseNote.toString());
				}

				return;
			});
	}

	async onunload() {
		super.onunload();

		this.app.workspace.detachLeavesOfType(ViewType.Errors.toString());
		this.app.workspace.detachLeavesOfType(ViewType.ReleaseNote.toString());
		this.app.workspace.detachLeavesOfType(ViewType.RPGManager.toString());

		this.app.workspace.off('resolved', this.refreshViews);
		this.app.workspace.off('modify', this.refreshViews);
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
		component.addChild(
			new Controller(
				this.app,
				el,
				source,
				component,
				sourcePath,
			)
		);
	}

	async loadSettings() {
		this.settings = Object.assign({}, RpgManagerDefaultSettings, await this.loadData());
	}

	public async updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void> {
		Object.assign(this.settings, settings);
		await this.saveData(this.settings);
	}

	private registerEvents(
	) : void {

		this.registerEvent(this.app.metadataCache.on('resolved', this.refreshViews.bind(this)));
		this.registerEvent(this.app.workspace.on('file-open', this.refreshViews.bind(this)));
	}

	private registerCodeBlock(
	): void {
		this.registerMarkdownCodeBlockProcessor('RpgManager', async (source: string, el, ctx) =>
			this.createRpgView(source, el, ctx, ctx.sourcePath)
		);
	}

	private registerCommands(
	): void {
		Object.keys(ComponentType).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			this.addCommand({
				id: "rpg-manager-create-" + type.toLowerCase(),
				name: "Create a new " + type,
				callback: () => {
					new CreationModal(
						this.app,
						ComponentType[type as keyof typeof ComponentType],
					).open();
				},
			});
			this.addCommand({
				id: "rpg-manager-fill-" + type.toLowerCase(),
				name: "Fill with " + type,
				callback: () => {
					let name: string|null = null;
					const activeFile = app.workspace.getActiveFile();
					if (activeFile != null) {
						name = activeFile.basename;
					}
					new CreationModal(
						this.app,
						ComponentType[type as keyof typeof ComponentType],
						false,
						name,
					).open();
				},
			});
		})
	}
}
