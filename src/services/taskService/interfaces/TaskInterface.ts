import { ElementInterface } from "../../../data/interfaces/ElementInterface";
import { PriorityType } from "../enums/PriorityType";
import { TaskStatusType } from "../enums/TaskStatusType";
import { TaskType } from "../enums/TaskType";

export interface TaskInterface {
	get id(): string;
	get element(): ElementInterface;
	get mentionedIn(): string[];
	set mentionedIn(value: string[]);
	get completedIn(): ElementInterface | undefined;
	set completedIn(value: ElementInterface | undefined);
	get priority(): PriorityType;
	set priority(value: PriorityType);
	get status(): TaskStatusType;
	set status(value: TaskStatusType);
	get name(): string;
	set name(value: string);
	get description(): string;
	set description(value: string);
	get completionDate(): Date | undefined;
	get type(): TaskType;
	set type(value: TaskType);
	prepare(): any;
	click(): void;
}
