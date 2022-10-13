import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserViewInterface} from "../interfaces/AnalyserViewInterface";

export abstract class AbstractAnalyserView extends AbstractRpgManager implements AnalyserViewInterface {
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string>>;

	constructor(
		app: App,
	) {
		super(app);
	}

	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {

	}
}
