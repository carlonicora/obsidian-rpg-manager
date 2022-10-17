import {AbstractAnalyserView} from "./abstract/AbstractAnalyserView";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";

export class AnalyserSceneView extends AbstractAnalyserView {
	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-new-analyser'});

		const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');
		const analyserListTimingElementEl: HTMLLIElement = analyserListEl.createEl('li');
		analyserListTimingElementEl.createSpan({cls: 'subtitle', text: 'Expected session duration: ' + this.transformTime(report.expectedDuration)})
	}
}
