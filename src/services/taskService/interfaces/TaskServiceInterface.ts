import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { TaskStatusType } from "../enums/TaskStatusType";
import { TaskInterface } from "./TaskInterface";

export interface TaskServiceInterface {
	getAll(notAlreadyMentionedIn?: ElementInterface): TaskInterface[];
	getByStatus(status: TaskStatusType, notAlreadyMentionedIn?: ElementInterface): TaskInterface[];
	getByElement(element: ElementInterface): TaskInterface[];
	getCompletedIn(element: ElementInterface): TaskInterface[];
	getMentionedIn(element: ElementInterface): TaskInterface[];
}
