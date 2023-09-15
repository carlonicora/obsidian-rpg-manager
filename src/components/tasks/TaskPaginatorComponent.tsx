// TaskPaginatorComponent.tsx
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { TaskInterface } from "src/services/taskService/interfaces/TaskInterface";

interface TaskPaginatorComponentProps {
	tasks: TaskInterface[];
	onPageChange: (tasks: TaskInterface[]) => void;
}

export default function TaskPaginatorComponent({
	tasks,
	onPageChange,
}: TaskPaginatorComponentProps): React.ReactElement {
	const ITEMS_PER_PAGE = 10;
	const [currentPage, setCurrentPage] = React.useState(1);

	const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentTasks = tasks.slice(startIndex, endIndex);

	React.useEffect(() => {
		onPageChange(currentTasks);
	}, [currentPage, tasks]);

	if (tasks.length <= ITEMS_PER_PAGE) return null;

	return (
		<div className="flex justify-center items-center mt-4">
			{currentPage > 1 && (
				<>
					<span
						onClick={() => setCurrentPage(1)}
						className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
					>
						<FontAwesomeIcon icon={faAngleDoubleLeft} />
					</span>
					<span
						onClick={() => setCurrentPage(currentPage - 1)}
						className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] mx-2"
					>
						<FontAwesomeIcon icon={faAngleLeft} />
					</span>
				</>
			)}

			<span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>

			{currentPage < totalPages && (
				<>
					<span
						onClick={() => setCurrentPage(currentPage + 1)}
						className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover] mx-2"
					>
						<FontAwesomeIcon icon={faAngleRight} />
					</span>
					<span
						onClick={() => setCurrentPage(totalPages)}
						className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
					>
						<FontAwesomeIcon icon={faAngleDoubleRight} />
					</span>
				</>
			)}
		</div>
	);
}
