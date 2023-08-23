import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { PriorityType } from "src/services/taskService/enums/PriorityType";
import { TaskStatusType } from "src/services/taskService/enums/TaskStatusType";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";
import TaskDetailComponent from "./TaskDetailComponent";

const TaskComponent = React.memo(function TaskComponent({
	element,
	task,
	onTaskDeletion,
	onTaskUpdate,
}: {
	element: ElementInterface;
	task: TaskInterface;
	onTaskDeletion: (task: TaskInterface) => void;
	onTaskUpdate: (task: TaskInterface) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const [showDetails, setShowDetails] = React.useState<boolean>(false);

	const handleStatusChange = (task: TaskInterface) => {
		task.click();
		onTaskUpdate(task);
	};

	const handlePriorityChange = (priority: PriorityType) => {
		task.priority = priority;
		onTaskUpdate(task);
	};

	const handleNameChange = (name: string) => {
		task.name = name;
		onTaskUpdate(task);
	};

	const handleUpdate = (task: TaskInterface) => {
		setShowDetails(false);
		onTaskUpdate(task);
	};

	let taskIcon: React.ReactElement;
	if (task.status === TaskStatusType.Complete) {
		taskIcon = (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="10" fill="green"></circle>
				<path d="M9 12l2 2l4-4" fill="lightgray" stroke="lightgray"></path>
			</svg>
		);
	} else if (task.status === TaskStatusType.Incomplete) {
		taskIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-[--background-modifier-border] group-hover:text-green-500 active:text-green-700 transition-colors duration-200"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<path d="M9 12l2 2l4-4"></path>
			</svg>
		);
	} else if (task.status === TaskStatusType.Proposed) {
		taskIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-[--text-warning] transition-colors duration-200"
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"></circle>
				<text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor">
					?
				</text>
			</svg>
		);
	}

	return (
		<>
			<div
				className={`flex items-center w-full text-sm cursor-pointer group ${
					!showDetails && "border-b border-b-[--background-modifier-border] hover:bg-[--background-primary-alt]"
				}`}
			>
				<div
					className="max-w-5 w-5 align-middle items-center !m-2"
					onClick={(e) => {
						e.stopPropagation();
						handleStatusChange(task);
					}}
				>
					{taskIcon}
				</div>
				<div className="w-full p-1 flex-grow">
					<div
						contentEditable={true}
						suppressContentEditableWarning={true}
						className="min-w-[60px] rounded-sm p-1 !border !border-transparent bg-[--background-primary] group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border] focus:!shadow-none"
						style={{ display: "inline-block" }}
						onBlur={(e) => {
							if (task.name !== e.target.textContent) handleNameChange(e.target.textContent || "");
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
							}
						}}
					>
						{task.name}
					</div>
				</div>
				<div className="pr-1 w-32 min-w-[8rem]">
					<select
						defaultValue={task.priority}
						onChange={(e) => handlePriorityChange(e.target.value as PriorityType)}
						className="selectBorder w-full 
                        !border !border-transparent group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border]
                        h-7 pl-1 
                        focus:!shadow-none !shadow-none
                        bg-transparent group-hover:bg-[--background-modifier-form-field]
                        "
					>
						{Object.entries(PriorityType)
							.filter(([key]) => isNaN(Number(key)))
							.map(([key, index]) => (
								<option key={key} value={index}>
									{key}
								</option>
							))}
					</select>
				</div>
				<div className="pr-1 w-28 min-w-[7rem] align-middle items-center opacity-0 group-hover:opacity-100 !text-[--text-muted] hover:!text-[--text-accent]">
					<button
						className="rpgm-danger"
						onClick={(e) => {
							e.stopPropagation();
							onTaskDeletion(task);
						}}
					>
						{t("buttons.delete")}
					</button>
				</div>
				<div
					className="pr-1 w-4 min-w-[1rem] align-middle items-center opacity-0 group-hover:opacity-100 !text-[--text-muted] hover:!text-[--text-accent]"
					onClick={() => setShowDetails(!showDetails)}
				>
					&gt;
				</div>
			</div>
			{showDetails && <TaskDetailComponent element={element} task={task} onTaskUpdate={handleUpdate} />}
		</>
	);
});

export default TaskComponent;
