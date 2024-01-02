import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { TaskStatusType } from "src/services/taskService/enums/TaskStatusType";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";
import AllTaskListComponent from "./AllTaskListComponent";
import AssignedTaskListComponent from "./AssignedTaskListComponent";
import OwnTaskListComponent from "./OwnTaskListComponent";

export default function TasksContainerComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	let tasks: TaskInterface[] = api.tasks.getMentionedIn(element);

	const [viewTasks, setViewTasks] = React.useState<boolean>(true);
	const [viewType, setViewType] = React.useState<"own" | "assigned" | "all">(tasks.length > 0 ? "assigned" : "own");

	if (!api.settings.showTasks[element.type]) return null;
	if (tasks.length === 0 && element.tasks.length === 0) return null;

	if (viewType === "own") {
		tasks = element.tasks;
	} else if (viewType === "all") {
		tasks = api.tasks.getByStatus(TaskStatusType.Incomplete, element);
	}

	return (
		<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
			<div className="flex items-center">
				<div
					onClick={() => setViewTasks(!viewTasks)}
					className="h-5 w-5 mr-2 flex items-center justify-center cursor-pointer"
				>
					<svg
						className="transform transition-transform duration-200"
						viewBox="0 0 24 24"
						style={{
							transform: viewTasks ? "rotate(0deg)" : "rotate(-90deg)",
						}}
					>
						<path fill="currentColor" d="M12 16l-8-8h16l-8 8z" />
					</svg>
				</div>
				<h2 className="!m-0">{t("tasks.task", { count: 2 })}</h2>
			</div>
			{viewTasks && (
				<div className="w-full mt-3 p-3 rounded-lg border border-[--background-modifier-border]">
					<div className="w-full pb-3 mb-3 border-b border-b-[--background-modifier-border] flex justify-between">
						<div className="w-full flex">
							<div
								className={`${
									viewType === "own" && "text-[--text-accent]"
								} pr-3 mr-3 border-r border-r-[--background-modifier-border] cursor-pointer hover:text-[--text-accent-hover]`}
								onClick={() => setViewType("own")}
							>
								{t("tasks.owned", { variable: element.name })}
							</div>
							<div
								className={`${
									viewType === "assigned" && "text-[--text-accent]"
								} pr-3 mr-3 border-r border-r-[--background-modifier-border] cursor-pointer hover:text-[--text-accent-hover]`}
								onClick={() => setViewType("assigned")}
							>
								{t("tasks.assignedto")} {element.name}
							</div>
							<div
								className={`${
									viewType === "all" && "text-[--text-accent]"
								} cursor-pointer hover:text-[--text-accent-hover]`}
								onClick={() => setViewType("all")}
							>
								{t("tasks.all")}
							</div>
						</div>
					</div>
					<div className="w-full min-h-[100px] relative">
						{viewType === "own" ? (
							<OwnTaskListComponent element={element} tasks={tasks} allowNewTask={viewTasks && viewType === "own"} />
						) : viewType === "assigned" ? (
							<AssignedTaskListComponent element={element} tasks={tasks} />
						) : (
							<AllTaskListComponent element={element} tasks={tasks} />
						)}
					</div>
				</div>
			)}
		</div>
	);
}
