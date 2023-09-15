import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { TimerService } from "src/services/TimerService";

export default function DurationAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [isRunning, setIsRunning] = React.useState<boolean>(false);
	const [duration, setDuration] = React.useState<number>(attribute.value || 0);
	const timerRef = React.useRef<NodeJS.Timeout | null>(null); // Use a ref to store the timer ID

	const handleStartStop = () => {
		if (isRunning) TimerService.endTimer(app, api);
		else TimerService.startTimer(app, api, element);

		setIsRunning(!isRunning);
	};

	React.useEffect(() => {
		if (isRunning) {
			timerRef.current = setInterval(() => {
				setDuration((prev) => prev + 1);
			}, 1000);
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isRunning]);

	const formatDuration = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	return (
		<div className="flex items-center space-x-4">
			<div className="font-bold">{t("attributes.duration")}</div>
			<div
				className="bg-[--background-secondary] border border-[--background-modifier-border] p-2 rounded cursor-pointer transition-transform duration-300 transform-gpu hover:scale-105"
				onClick={handleStartStop}
			>
				{isRunning ? (
					<div className="w-4 h-4 bg-[--text-normal]"></div>
				) : (
					<svg viewBox="0 0 12 14" className="fill-current text-[--text-normal]" width="12" height="14">
						<polygon points="0,0 12,7 0,14"></polygon>
					</svg>
				)}
			</div>
			<div>{formatDuration(duration)}</div>
		</div>
	);
}
