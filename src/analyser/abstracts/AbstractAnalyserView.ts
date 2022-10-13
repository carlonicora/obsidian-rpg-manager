import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";

export class AnalyserView extends AbstractRpgManager {
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
