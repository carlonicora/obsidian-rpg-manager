import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";
import AssignedTaskComponent from "./AssignedTaskComponent";
import TaskPaginatorComponent from "./TaskPaginatorComponent";

export default function AssignedTaskListComponent({
	element,
	tasks,
}: {
	element: ElementInterface;
	tasks: TaskInterface[];
}): React.ReactElement {
	const { t } = useTranslation();

	const api: RpgManagerInterface = useApi();

	const ITEMS_PER_PAGE = 10;
	const initialTasks = tasks.slice(0, ITEMS_PER_PAGE);
	const [paginatedTasks, setPaginatedTasks] = React.useState<TaskInterface[]>(initialTasks);

	const handleSave = (task: TaskInterface) => {
		const codeblockService = new RpgManagerCodeblockService(app, api, task.element.file);
		codeblockService.addOrUpdateTask(task);
	};

	return (
		<div>
			<div className="text-xs text-[--text-muted] flex items-center w-full hover:bg-[--background-primary-alt] border-b border-b-[--background-modifier-border] cursor-pointer group">
				<div className="col-span-1 max-w-5 w-5 align-middle items-center !m-2">&nbsp;</div>
				<div className="col-span-1 max-w-[10rem] w-40 align-middle items-center !m-2">
					{t("elements.element", { count: 1 })}
				</div>
				<div className="w-full p-1 pl-3 flex-grow">{t("tasks.name")}</div>
				<div className="pr-1 pl-1 w-64 min-w-[16rem]">{t("tasks.priority")}</div>
			</div>
			{paginatedTasks.map((task: TaskInterface, index: number) => (
				<AssignedTaskComponent key={task.id} element={element} task={task} onTaskUpdate={handleSave} />
			))}
			<TaskPaginatorComponent tasks={tasks} onPageChange={setPaginatedTasks} />
		</div>
	);
}
