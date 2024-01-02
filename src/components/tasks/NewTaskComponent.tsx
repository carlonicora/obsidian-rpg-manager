import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { Task } from "src/services/taskService/Task";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";

export default function NewTaskComponent({
	element,
	onTaskCreation,
	onCancel,
}: {
	element: ElementInterface;
	onTaskCreation: (task: TaskInterface) => void;
	onCancel?: (showNewTask: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const [name, setName] = React.useState<string>("");

	const inputRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleCreateNewTask = (): void => {
		const task: TaskInterface = new Task(api, element);
		task.name = name;

		onTaskCreation(task);
	};

	return (
		<div className="flex w-full pb-1 mb-1 pt-1">
			<div className="flex">
				<div className="col-span-1 max-w-5 w-5 align-middle items-center !m-2">&nbsp;</div>
				<div className="w-full p-1 pl-3 flex-grow">
					<div
						ref={inputRef}
						contentEditable={true}
						suppressContentEditableWarning={true}
						className="min-w-[60px] rounded-sm p-1 !border !border-transparent bg-[--background-primary] group-hover:!border-[--background-modifier-border] focus:!border-[--background-modifier-border] focus:!shadow-none"
						style={{ whiteSpace: "nowrap", overflow: "hidden" }}
						onBlur={(e: React.SyntheticEvent<HTMLDivElement>) => setName(e.currentTarget.textContent || "")}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
							}
						}}
					/>
				</div>
			</div>
			<div className="flex justify-end w-full text-xs">
				{onCancel && <button className="rpgm-secondary pl-3 pr-3 mr-3" onClick={() => onCancel(false)}>
					{t("buttons.cancel")}
				</button>}
				<button className="rpgm-primary pl-3 pr-3" onClick={handleCreateNewTask}>
					{t("create.add", { context: "task" })}
				</button>
			</div>
		</div>
	);
}
