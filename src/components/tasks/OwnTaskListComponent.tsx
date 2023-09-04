import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";
import NewTaskComponent from "./NewTaskComponent";
import TaskComponent from "./TaskComponent";
import TaskPaginatorComponent from "./TaskPaginatorComponent";

export default function OwnTaskListComponent({
	element,
	tasks,
	allowNewTask,
}: {
	element: ElementInterface;
	tasks: TaskInterface[];
	allowNewTask: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const ITEMS_PER_PAGE = 10;
	const initialTasks = tasks.slice(0, ITEMS_PER_PAGE);
	const [paginatedTasks, setPaginatedTasks] = React.useState<TaskInterface[]>(initialTasks);

	const [newTask, setNewTask] = React.useState<boolean>(false);
	const [showNewTask, setShowNewTask] = React.useState<boolean>(allowNewTask);

	const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

	const handleDelete = (task: TaskInterface) => {
		codeblockService.deleteTask(task);
	};

	const handleSave = (task: TaskInterface) => {
		codeblockService.addOrUpdateTask(task);
		setNewTask(false);
		setShowNewTask(true);
	};

	function handleCreateNewTask(): void {
		setNewTask(true);
		setShowNewTask(false);
	}

	return (
		<div>
			<div className="text-xs text-[--text-muted] flex items-center w-full hover:bg-[--background-primary-alt] border-b border-b-[--background-modifier-border] cursor-pointer group">
				<div className="col-span-1 max-w-5 w-5 align-middle items-center !m-2">&nbsp;</div>
				<div className="w-full p-1 pl-3 flex-grow">{t("tasks.name")}</div>
				<div className="pr-1 pl-1 w-64 min-w-[16rem]">{t("tasks.priority")}</div>
			</div>
			{paginatedTasks.map((task: TaskInterface, index: number) => (
				<TaskComponent
					key={task.id}
					element={element}
					task={task}
					onTaskDeletion={handleDelete}
					onTaskUpdate={handleSave}
				/>
			))}

			{newTask && (
				<NewTaskComponent
					element={element}
					onTaskCreation={handleSave}
					onCancel={() => {
						setNewTask(false);
						setShowNewTask(true);
					}}
				/>
			)}
			{allowNewTask && showNewTask && !newTask && (
				<div className="pb-1 mb-1 pt-1 text-xs flex justify-end w-full">
					<button className="rpgm-secondary" onClick={handleCreateNewTask}>
						{t("create.new", { context: "task" })}
					</button>
				</div>
			)}
			<TaskPaginatorComponent tasks={tasks} onPageChange={setPaginatedTasks} />
		</div>
	);
}
