import { App, Plugin } from "obsidian";
import { ElementController } from "src/controllers/ElementController";
import { RPGManager } from "src/interfaces/RPGManager";

export class PluginServices {
	static async registerProcessors(app: App, gtd: Plugin, api: RPGManager): Promise<void> {
		gtd.registerMarkdownCodeBlockProcessor("rpgm5", async (source: string, el, ctx) => {
			ctx.addChild(new ElementController(app, api, ctx.sourcePath, el, source));
		});
	}

	static async registerEvents(app: App, gtd: Plugin, api: RPGManager): Promise<void> {
		// app.workspace.on("active-leaf-change", (leaf: WorkspaceLeaf | null) => {
		// 	app.workspace.trigger("gtd:refresh-views");
		// });
		// gtd.registerEvent(
		// 	app.metadataCache.on("resolve", async (file: TFile) => {
		// 		const codeblockService: CodeblockService = new CodeblockService(app, api, file);
		// 		const obsidianTasks: string[] = await codeblockService.readFileForTasks();
		// 		if (obsidianTasks.length > 0) {
		// 			const newTasks: TaskInterface[] = [];
		// 			const updatedTasks: TaskInterface[] = [];
		// 			obsidianTasks.map((obsidianTask: string) => {
		// 				if (obsidianTask.contains("|]]")) {
		// 					const taskId: string = obsidianTask.substring(
		// 						obsidianTask.indexOf("[[") + 2,
		// 						obsidianTask.indexOf("|]]")
		// 					);
		// 					const name: string = obsidianTask.substring(obsidianTask.indexOf("|]]") + 3);
		// 					const isDone: boolean = obsidianTask.indexOf("[x] ") > -1;
		// 					const task: TaskInterface | undefined = api.task(taskId) as TaskInterface;
		// 					if (!task) {
		// 						const newTaskData: TaskDataInterface = {
		// 							id: randomUUID(),
		// 							name: name,
		// 							description: "",
		// 							dates: {
		// 								from: undefined,
		// 								due: undefined,
		// 							},
		// 							isDone: isDone,
		// 							position: 0,
		// 							section: "section-new",
		// 							obsidianFileContainer: file.path,
		// 						};
		// 						const newTask: TaskInterface = new Task(app, api, newTaskData, file);
		// 						newTasks.push(newTask);
		// 					} else {
		// 						let isUpdated = false;
		// 						if (task.name !== name) {
		// 							task.name = name;
		// 							isUpdated = true;
		// 						}
		// 						if (task.isDone !== isDone) {
		// 							task.isDone = isDone;
		// 							isUpdated = true;
		// 						}
		// 						if (isUpdated) updatedTasks.push(task);
		// 					}
		// 				}
		// 			});
		// 			if (newTasks.length > 0) {
		// 				await api.addTasks(newTasks);
		// 			}
		// 			if (updatedTasks.length > 0) {
		// 				await api.commit();
		// 			}
		// 			let existingObsidianFileTasks: TaskInterface[] = api.tasks({ file: file });
		// 			if (existingObsidianFileTasks.length > 0) {
		// 				if (obsidianTasks.length > 0) {
		// 					obsidianTasks.forEach((obsidianTask: string) => {
		// 						if (obsidianTask.contains("|]]")) {
		// 							const taskId: string = obsidianTask.substring(
		// 								obsidianTask.indexOf("[[") + 2,
		// 								obsidianTask.indexOf("|]]")
		// 							);
		// 							const index: number = existingObsidianFileTasks.findIndex(
		// 								(obsidianTask: TaskInterface) => obsidianTask.id === taskId
		// 							);
		// 							if (index > -1) existingObsidianFileTasks = existingObsidianFileTasks.splice(index + 1, 1);
		// 						}
		// 					});
		// 				}
		// 				if (existingObsidianFileTasks.length > 0) {
		// 					await api.removeTasks(existingObsidianFileTasks);
		// 				}
		// 			}
		// 		}
		// 	})
		// );
		// gtd.registerEvent(
		// 	app.vault.on("delete", async (file: TFile) => {
		// 		const deletedTasks: TaskInterface[] = api.tasks({ file: file });
		// 		if (deletedTasks.length > 0) {
		// 			await api.removeTasks(deletedTasks);
		// 		}
		// 	})
		// );
		// gtd.registerEvent(
		// 	app.workspace.on("file-open", (file: TFile) => {
		// 		app.workspace.trigger("gtd:refresh-views");
		// 	})
		// );
	}
}
