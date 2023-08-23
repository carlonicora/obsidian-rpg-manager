import i18n from "i18next";
import { MarkdownView, Plugin_2, TFile, WorkspaceLeaf } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { Controller } from "src/controllers/Controller";
import { ModalCreationController } from "src/controllers/ModalCreationController";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { DatabaseFactory } from "src/factories/DatabaseFactory";
import { ElementFactory } from "src/factories/ElementFactory";
import { EditorPositionService } from "./EditorPositionService";
import { TimerService } from "./TimerService";

export class PluginServices {
	static async registerProcessors(rpgm: RpgManagerInterface): Promise<void> {
		(rpgm as unknown as Plugin_2).registerMarkdownCodeBlockProcessor("RpgManager4", async (source: string, el, ctx) => {
			ctx.addChild(new Controller(rpgm, ctx.sourcePath, el, source));
		});
	}

	static async registerEvents(rpgm: RpgManagerInterface, database: ElementInterface[]): Promise<void> {
		app.workspace.on("active-leaf-change", (leaf: WorkspaceLeaf | null) => {
			if (TimerService.runningScene === undefined) return;

			let sceneFound = false;
			app.workspace.iterateAllLeaves((leaf: WorkspaceLeaf) => {
				if (leaf.view instanceof MarkdownView) {
					const file = leaf.view?.file;
					if (file !== undefined && file.path === TimerService.runningScene) sceneFound = true;
				}
			});

			if (!sceneFound) TimerService.endTimer(rpgm);
		});

		(rpgm as unknown as Plugin_2).registerEvent(
			app.metadataCache.on("resolve", (file: TFile) => {
				const element: ElementInterface | ElementInterface[] | undefined = rpgm.get(file.path);
				if (element === undefined || Array.isArray(element)) {
					DatabaseFactory.add(app, rpgm, database, file).then((elements: ElementInterface[]) => {
						database = elements;

						ElementFactory.updateFileRelationships(app, rpgm, file, database);

						app.workspace.trigger("rpgmanager:refresh-views");
					});
				} else {
					DatabaseFactory.update(app, rpgm, database, element).then(() => {
						ElementFactory.updateFileRelationships(app, rpgm, file, database);

						const { editor, cursorPosition, scrollInfo } = EditorPositionService.getEditorPositions(file.path) || {};
						if (editor && cursorPosition && scrollInfo) {
							editor.scrollTo(scrollInfo.left, scrollInfo.top);
							EditorPositionService.clearEditorPosition(file.path);
						}

						app.workspace.trigger("rpgmanager:refresh-views");
					});
				}
			})
		);

		(rpgm as unknown as Plugin_2).registerEvent(
			app.vault.on("rename", (file: TFile, oldPath: string) => {
				const element: ElementInterface | ElementInterface[] | undefined = rpgm.get(file.path);

				if (element === undefined || Array.isArray(element)) return;

				DatabaseFactory.rename(app, rpgm, database, element, oldPath).then(() => {
					element.touch();

					app.workspace.trigger("rpgmanager:refresh-views");
				});
			})
		);

		(rpgm as unknown as Plugin_2).registerEvent(
			app.vault.on("delete", (file: TFile) => {
				database = database.filter((element: ElementInterface) => element.path !== file.path);
			})
		);

		(rpgm as unknown as Plugin_2).registerEvent(
			app.workspace.on("file-open", (file: TFile) => {
				app.workspace.trigger("rpgmanager:refresh-views");
			})
		);
	}

	static async registerCommands(rpgm: RpgManagerInterface): Promise<void> {
		(rpgm as unknown as Plugin_2).addCommand({
			id: "rpg-manager-create-select",
			name: i18n.t("create.new", { context: "element" }),
			callback: () => {
				new ModalCreationController(rpgm).open();
			},
		});
		(rpgm as unknown as Plugin_2).addCommand({
			id: "rpg-manager-create-in-select",
			name: i18n.t("create.in", { context: "element" }),
			callback: () => {
				new ModalCreationController(rpgm, undefined, true).open();
			},
		});

		Object.keys(ElementType)
			.filter((v) => isNaN(Number(v)))
			.forEach((type, index) => {
				(rpgm as unknown as Plugin_2).addCommand({
					id: "rpg-manager-create-" + type.toLowerCase(),
					name: i18n.t("create.new", { context: type.toLowerCase() }),
					callback: () => {
						new ModalCreationController(rpgm, ElementType[type as keyof typeof ElementType]).open();
					},
				});
				(rpgm as unknown as Plugin_2).addCommand({
					id: "rpg-manager-create-in-" + type.toLowerCase(),
					name: i18n.t("create.in", { context: type.toLowerCase() }),
					callback: () => {
						new ModalCreationController(rpgm, ElementType[type as keyof typeof ElementType], true).open();
					},
				});
			});
	}
}
