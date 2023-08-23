import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { TaskStatusType } from "./enums/TaskStatusType";
import { TaskInterface } from "./interfaces/TaskInterface";
import { TaskServiceInterface } from "./interfaces/TaskServiceInterface";

export class taskService implements TaskServiceInterface {
	private _database: ElementInterface[] = [];

	constructor(database: ElementInterface[] | undefined) {
		if (database !== undefined) this._database = database;
	}

	getAll(notAlreadyMentionedIn?: ElementInterface): TaskInterface[] {
		const response: TaskInterface[] = [];

		if (this._database === undefined) return response;

		this._database.forEach((element: ElementInterface) => {
			response.push(...element.tasks);
		});

		if (notAlreadyMentionedIn !== undefined)
			return response.filter(
				(task: TaskInterface) =>
					task.mentionedIn === undefined ||
					(!task.mentionedIn.contains(notAlreadyMentionedIn.path) && task.element.path !== notAlreadyMentionedIn.path)
			);

		return response;
	}

	getByStatus(status: TaskStatusType, notAlreadyMentionedIn?: ElementInterface): TaskInterface[] {
		return this.getAll(notAlreadyMentionedIn).filter((task: TaskInterface) => task.status === status);
	}

	getByElement(element: ElementInterface): TaskInterface[] {
		return this.getAll().filter((task: TaskInterface) => task.element.path === element.path);
	}

	getCompletedIn(element: ElementInterface): TaskInterface[] {
		return this.getAll().filter((task: TaskInterface) => task.completedIn?.path === element.path);
	}

	getMentionedIn(element: ElementInterface): TaskInterface[] {
		return this.getAll().filter(
			(task: TaskInterface) => task.mentionedIn !== undefined && task.mentionedIn.contains(element.path)
		);
	}
}
