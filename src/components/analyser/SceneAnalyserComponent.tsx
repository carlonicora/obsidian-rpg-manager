import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { SceneAnalyserService } from "src/services/sceneAnalyserService/SceneAnalyserService";
import { SceneAnalysisInterface } from "src/services/sceneAnalyserService/interfaces/SceneAnalysisInterface";

export default function SceneAnalyserComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const sceneAnalyser = new SceneAnalyserService(api);
	const analysis: SceneAnalysisInterface = sceneAnalyser.analyseSession(element);

	const getLineColor = (value: number): string => {
		if ((value >= -100 && value <= -50) || (value >= 50 && value <= 100)) return "bg-[--text-error]";
		if ((value >= -49 && value <= -25) || (value >= 25 && value <= 49)) return "bg-[--text-warning]";
		return "bg-[--text-success]";
	};

	const getTextColor = (value: number): string => {
		if (value < 50) return "text-[--text-error]";
		if (value < 75) return "text-[--text-warning]";
		return "text-[--text-success]";
	};

	const LineIndicator = ({ value }: { value: number }) => (
		<div className="w-full flex bg-opacity-100 items-center h-[2px] bg-[--background-modifier-border] relative">
			<div
				className={`h-[2px] ${getLineColor(value)} transition-width duration-300 absolute left-1/2`}
				style={{
					width: `${Math.abs(value) / 2}%`,
					transform: value < 0 ? `translateX(-100%)` : `translateX(0)`,
				}}
			></div>
		</div>
	);

	function getContext(value: number): string | undefined {
		if (value > 50) return "positiveerror";
		if (value > 25) return "positivewarnign";
		if (value < -50) return "negativeerror";
		if (value < -25) return "negativewarning";
		return undefined;
	}

	function secondsToHHMM(duration: number): string {
		const minutesDuration = Math.floor(duration / 60);
		const hours = Math.floor(minutesDuration / 60);
		const minutes = minutesDuration % 60;

		return `${String(hours)}h ${String(minutes).padStart(2, "0")}'`;
	}

	return (
		<div className="w-full mt-3">
			<h2 className="!m-0 !mb-3">{t("analyser.sceneanalyser")}</h2>
			<div className={`text-center w-full mb-3 !font-extralight text-5xl ${getTextColor(analysis.score)}`}>
				{analysis.score + "%"}
			</div>
			<div className="w-full !mt-3 mb-2 text-center">
				{t("analyser.expectedduration")}: <span className="font-bold">{secondsToHHMM(analysis.expectedDuration)}</span>
			</div>

			<div className="w-full !mt-3 mb-2 text-center">
				{t("analyser.activity")}: {analysis.activity}%
			</div>
			<LineIndicator value={analysis.activity} />
			{getContext(analysis.activity) !== undefined && (
				<div className="w-full !mt-0 mb-2 text-center text-xs">
					{t("analyser.saactivity", { context: getContext(analysis.activity) })}
				</div>
			)}

			<div className="w-full !mt-3 mb-2 text-center">
				{t("analyser.excitement")}: {analysis.excitement}%
			</div>
			<LineIndicator value={analysis.excitement} />
			{getContext(analysis.excitement) && (
				<div className="w-full !mt-0 mb-2 text-center text-xs">
					{t("sanalyser.aexcitement", { context: getContext(analysis.excitement) })}
				</div>
			)}

			<div className="w-full !mt-3 mb-2 text-center">
				{t("analyser.interest")}: {analysis.interest}%
			</div>
			<LineIndicator value={analysis.interest} />
			{getContext(analysis.interest) && (
				<div className="w-full !mt-0 mb-2 text-center text-xs">
					{t("analyser.sainterest", { context: getContext(analysis.interest) })}
				</div>
			)}

			<div className="w-full !mt-3 mb-2 text-center">
				{t("analyser.variety")}: {analysis.variety}%
			</div>
			<LineIndicator value={analysis.variety} />
			{getContext(analysis.variety) && (
				<div className="w-full !mt-0 mb-2 text-center text-xs">
					{t("savariety", { context: getContext(analysis.variety) })}
				</div>
			)}
		</div>
	);
}
