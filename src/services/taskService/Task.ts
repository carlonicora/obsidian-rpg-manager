import { RpgManagerInterface } from "src/RpgManagerInterface";
import { v4 as uuidv4 } from "uuid";
import { ElementInterface } from "../../data/interfaces/ElementInterface";
import { PriorityType } from "./enums/PriorityType";
import { TaskStatusType } from "./enums/TaskStatusType";
import { TaskType } from "./enums/TaskType";
import { TaskInterface } from "./interfaces/TaskInterface";

export class Task implements TaskInterface {
	private _id: string;
	private _priority: PriorityType;
	private _name: string;
	private _description: string;
	private _status: TaskStatusType;
	private _completedIn?: ElementInterface;
	private _mentionedIn?: string[];
	private _completionDate?: Date;
	private _type: TaskType = TaskType.Custom;

	constructor(
		api: RpgManagerInterface,
		private _element: ElementInterface,
		task?: {
			id: string;
			priority: number;
			status: TaskStatusType;
			name: string;
			description: string;
			completedIn?: string;
			mentionedIn?: string[];
			completionDate?: string;
			type?: TaskType;
		}
	) {
		if (task !== undefined) {
			this._id = task.id;
			switch (task.priority) {
				case 2:
					this._priority = PriorityType.Medium;
					break;
				case 3:
					this._priority = PriorityType.High;
					break;
				default:
					this._priority = PriorityType.Low;
					break;
			}
			this._status = task.status as TaskStatusType;
			this._name = task.name;
			this._description = task.description;
			this._type = task.type || TaskType.Custom;

			if (task.completedIn !== undefined) this._completedIn = api.get(task.completedIn) as ElementInterface;
			if (task.mentionedIn !== undefined) this._mentionedIn = task.mentionedIn;
			if (task.completionDate !== undefined) this._completionDate = new Date(task.completionDate);
		} else {
			this._id = uuidv4();
			this._priority = PriorityType.Low;
			this._status = TaskStatusType.Incomplete;
			this._type = TaskType.Custom;
		}
	}

	get id(): string {
		return this._id;
	}

	prepare(): any {
		const response: any = {
			id: this._id,
			priority: 1,
			name: this._name,
			description: this._description,
			status: this._status,
			type: this._type,
		};

		if (this._priority === PriorityType.Medium) response.priority = 2;
		if (this._priority === PriorityType.High) response.priority = 3;
		if (this._completedIn !== undefined) response.completedIn = this._completedIn.id;
		if (this._completionDate !== undefined) response.completionDate = this._completionDate.toISOString();
		if (this._mentionedIn !== undefined) response.mentionedIn = this._mentionedIn;

		return response;
	}

	get type(): TaskType {
		return this._type;
	}

	set type(value: TaskType) {
		this._type = value;
	}

	get status(): TaskStatusType {
		return this._status;
	}

	set status(value: TaskStatusType) {
		this._status = value;
	}

	get element(): ElementInterface {
		return this._element;
	}

	get priority(): PriorityType {
		return this._priority;
	}

	set priority(value: PriorityType) {
		this._priority = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get completedIn(): ElementInterface | undefined {
		return this._completedIn;
	}

	set completedIn(value: ElementInterface | undefined) {
		this._completedIn = value;
	}

	get mentionedIn(): string[] {
		return this._mentionedIn || [];
	}

	set mentionedIn(value: string[]) {
		this._mentionedIn = value;
	}

	get completionDate(): Date | undefined {
		return this._completionDate;
	}

	click(): void {
		if (this.status === TaskStatusType.Complete) {
			this._status = TaskStatusType.Incomplete;
			this._completionDate = undefined;
		} else {
			this._status = TaskStatusType.Complete;
			this._completionDate = new Date();
		}
	}
}
