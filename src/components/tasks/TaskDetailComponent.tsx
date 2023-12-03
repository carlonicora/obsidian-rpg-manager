import { useApp } from "@/hooks/useApp";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { NewRelationshipController } from "src/controllers/NewRelationshipController";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { PriorityType } from "src/services/taskService/enums/PriorityType";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";

export default function TaskDetailComponent({
	element,
	task,
	onTaskUpdate,
}: {
	element: ElementInterface;
	task: TaskInterface;
	onTaskUpdate: (task: TaskInterface) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [name, setName] = React.useState<string>(task.name);
	const [priority, setPriority] = React.useState<string>(task.priority);
	const [description, setDescription] = React.useState<string>(task.description);
	const [mentionedIn, setMentionedIn] = React.useState<string[]>(task.mentionedIn ?? []);

	const handleCompleteTask = () => {
		task.click();
		onTaskUpdate(task);
	};

	const handleSaveTask = () => {
		task.name = name;
		task.priority = priority as PriorityType;
		task.description = description;

		onTaskUpdate(task);
	};

	const handleRemoveMentionedIn = (mentionedInElement: ElementInterface) => {
		task.mentionedIn = task.mentionedIn?.filter((id: string) => id !== mentionedInElement.id);
		setMentionedIn(task.mentionedIn);
	};

	const handleAddMentionedInId = (id: string) => {
		if (task.mentionedIn.includes(id)) return;

		task.mentionedIn = [...(task.mentionedIn ?? []), id];
		setMentionedIn(task.mentionedIn);
	};

	const handleAddmentionedIn = () => {
		const searcher = new NewRelationshipController(app, api, element, undefined, undefined, handleAddMentionedInId);
		searcher.open();
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 align-items-start border border-[--background-modifier-border] rounded-lg text-sm m-3 p-3 space-y-3">
			<div className="col-span-4">
				<button
					className={`text-xs p-3 hover:text-[--text-on-accent] hover:!bg-[--interactive-accent-hover] ${
						task.status === "complete" &&
						"!bg-green-100 hover:!bg-green-100 !text-green-600 hover:!text-green-800 !border-green-600 hover:!border-green-800"
					}`}
					onClick={handleCompleteTask}
				>
					{task.status === "complete" ? "Completed" : "Mark complete"}
				</button>
			</div>
			<div className="col-span-4">
				<input
					type="text"
					defaultValue={name}
					className="w-full !text-xl p-1"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="col-span-1 ml-2 text-xs text-[--text-faint] h-7 ">{t("elements.element", { count: 1 })}</div>
			<div className="col-span-3 ml-3 text-sm h-7 ">
				<a
					href={task.element.path}
					className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
				>
					{task.element.name}
				</a>
			</div>
			<div className="col-span-1 ml-2 text-xs text-[--text-faint] h-7 ">{t("tasks.mentionedin")}</div>
			<div className="col-span-3 min-h-[1.75rem]">
				{mentionedIn.map((id: string) => {
					const mentionedInElement = api.getById(id) as ElementInterface;
					return (
						<div key={mentionedInElement.id} className={`ml-3 group w-full`}>
							<a
								href={mentionedInElement.path}
								className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
							>
								{mentionedInElement.name}
							</a>
							<span
								className="ml-5 opacity-0 group-hover:opacity-100 cursor-pointer"
								title={`Remove task from ${mentionedInElement.name}`}
								onClick={() => handleRemoveMentionedIn(mentionedInElement)}
							>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</div>
					);
				})}
				<div>
					<button
						className="!m-0 !mt-2 !p-3
                            !border-0 hover:!border-0
                            hover:bg-[--background-secondary] 
                            focus:!shadow-none !shadow-none hover:!shadow-none
                            text-[--text-muted] hover:text-[--text-normal] text-xs"
						onClick={handleAddmentionedIn}
					>
						{t("tasks.mentionedin")}
					</button>
				</div>
			</div>
			<div className="col-span-1 ml-2 text-xs text-[--text-faint] h-7 ">{t("tasks.priority")}</div>
			<div className="col-span-3 h-7 ml-3">
				<select
					onChange={(e) => setPriority(e.target.value)}
					defaultValue={priority}
					className="selectBorderVisible !border !border-[--background-modifier-border]
                    h-7 pl-1 pr-3
                        focus:!shadow-none !shadow-none selectBorder"
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
			<div className="col-span-1 ml-2 text-xs text-[--text-faint]">{t("tasks.description")}</div>
			<div className="col-span-3 ml-3">
				<MarkdownEditorComponent
					initialValue={description}
					campaignId={element.type === ElementType.Campaign ? element.id : element.campaign.id}
					onChange={setDescription}
					className="text-sm w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md focus:!shadow-none !shadow-none"
				/>
			</div>
			<div className="col-span-4 flex justify-end">
				<button className="rpgm-primary" onClick={handleSaveTask}>
					{t("buttons.save")}
				</button>
			</div>
		</div>
	);
}
