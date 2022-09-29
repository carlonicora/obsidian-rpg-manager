import {SceneAnalyser, ThresholdResult} from "../helpers/SceneAnalyser";
import {ComponentType} from "../enums/ComponentType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractStoryCircleStageSelectorView} from "./AbstractStoryCircleStageSelectorView";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {AbtStage} from "../enums/AbtStage";
import {EditorSelector} from "../helpers/EditorSelector";

export abstract class AbstractPlotHeaderView extends AbstractStoryCircleStageSelectorView {


	protected addAbtPlot(
		plot: any,
	): void {
		if (
			(plot.need == null || plot.need === '') &&
			(plot.and == null || plot.and === '') &&
			(plot.but == null || plot.but === '') &&
			(plot.therefore == null || plot.therefore === '')
		) return;

		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'ABT Plot'});
		const titleEditor = headerEl.createEl('span', {cls: 'rpgm-td-edit', text: '</>'});
		titleEditor.addEventListener('click', () => {
			EditorSelector.select(this.app, this.currentElement);
		})

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		Object.entries(plot).forEach(([name, value]: [string, string]) => {
			const row = tableEl.createEl('tr');
			row.createEl('td', {cls: 'header', text: name});
			const valueRowEl = row.createEl('td');

			MarkdownRenderer.renderMarkdown(
				value,
				valueRowEl,
				this.sourcePath,
				null as unknown as Component,
			);
		});
	}

	protected addStoryCirclePlot(
		plot: any,
	): void {
		if (
			(plot.you == null || plot.you === '') &&
			(plot.need == null || plot.need === '') &&
			(plot.go == null || plot.go === '') &&
			(plot.search == null || plot.search === '') &&
			(plot.find == null || plot.find === '') &&
			(plot.take == null || plot.take === '') &&
			(plot.return == null || plot.return === '') &&
			(plot.change == null || plot.change === '')
		) return;

		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'Story Circle Plot'});
		const titleEditor = headerEl.createEl('span', {cls: 'rpgm-td-edit', text: 'edit'});
		titleEditor.addEventListener('click', () => {
			EditorSelector.select(this.app, this.currentElement);
		})

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		Object.entries(plot).forEach(([name, value]: [string, string]) => {
			const row = tableEl.createEl('tr');
			row.createEl('td', {cls: 'header', text: name});
			const valueRowEl = row.createEl('td');

			MarkdownRenderer.renderMarkdown(
				value,
				valueRowEl,
				this.sourcePath,
				null as unknown as Component,
			);
		});
	}

	protected addActBalance(
		analyser: SceneAnalyser,
	): void {
		const analyserEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-analyser'});

		if (analyser.expectedRunningTime !== 0) {
			const expectedHoursDuration: number = Math.floor(analyser.expectedRunningTime / 60);
			const expectedMinutesDuration: number = (analyser.expectedRunningTime - (expectedHoursDuration * 60));
			const expectedDuration: string = (expectedHoursDuration < 10 ? '0' + expectedHoursDuration.toString() : expectedHoursDuration.toString()) +
				':' +
				(expectedMinutesDuration < 10 ? '0' + expectedMinutesDuration.toString() : expectedMinutesDuration.toString());

			analyserEl.createDiv().createSpan({cls: 'header', text: 'Expected ' + ComponentType[analyser.parentType] + ' duration: ' + expectedDuration})
		}

		if (!analyser.isSingleScene) {
			const analyserHeadlineEl: HTMLSpanElement = analyserEl.createSpan({cls: 'header'});

			if (analyser.excitementLevel === ThresholdResult.Correct && analyser.activityLevel === ThresholdResult.Correct) {
				analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is balanced!';
			} else {
				analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is not balanced!';
				analyserHeadlineEl.addClass('warning');
				const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');
				const analyserActivityElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserActivityDescriptionEl: HTMLSpanElement = analyserActivityElementEl.createSpan({cls: 'description'});
				const analyserExcitementElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserExcitementDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});

				switch (analyser.activityLevel) {
					case ThresholdResult.Correct:
						analyserActivityElementEl.textContent = 'The amount of active scenes is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						analyserActivityElementEl.textContent = 'Too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						analyserActivityElementEl.textContent = 'Maybe too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						analyserActivityElementEl.textContent = 'Maybe not enough active scenes: ';
						analyserActivityDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
						analyserActivityElementEl.textContent = 'Not enough active scenes: ';
						analyserActivityDescriptionEl.textContent = '(only ';
						break;
				}

				if (analyser.activityLevel !== ThresholdResult.Correct) {
					analyserActivityElementEl.appendChild(analyserActivityDescriptionEl as Node);
					analyserActivityDescriptionEl.textContent += analyser.activeScenePercentage + '% out of ' + analyser.targetActiveScenePercentage + '% are active)'
				}

				switch (analyser.excitementLevel) {
					case ThresholdResult.Correct:
						analyserExcitementElementEl.textContent = 'The amount of exciting time is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						analyserExcitementElementEl.textContent = 'Too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						analyserExcitementElementEl.textContent = 'Maybe too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						analyserExcitementElementEl.textContent = 'Maybe not enough excitement: ';
						analyserExcitementDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
						analyserExcitementElementEl.textContent = 'Not enough excitement: ';
						analyserExcitementDescriptionEl.textContent = '(only ';
						break;
				}

				if (analyser.excitementLevel !== ThresholdResult.Correct) {
					analyserExcitementElementEl.appendChild(analyserExcitementDescriptionEl as Node);
					analyserExcitementDescriptionEl.textContent += analyser.excitingScenePercentage + '% of the running time out of ' + analyser.targetExcitingScenePercentage + '% is exciting)'
				}
			}
		}
	}

	protected addAbtStageSelector(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): void {
		if (data.additionalInformation?.id !== undefined) {

			const abtSelectorEl = contentEl.createEl("select");
			abtSelectorEl.createEl("option", {
				text: "",
				value: ""
			}).selected = true;

			Object.keys(AbtStage).filter((v) => isNaN(Number(v))).forEach((type, index) => {
				const abtOptionEl = abtSelectorEl.createEl("option", {
					text: type,
					value: type,
				});

				if (data.value.content.toString() === type) abtOptionEl.selected = true;
			});

			abtSelectorEl.addEventListener("change", (e) => {
				const file: TFile|undefined = data.additionalInformation.file;

				if (file !== undefined){
					const map: Map<string,string> = new Map<string, string>();
					map.set('abt', abtSelectorEl.value);
					this.factories.frontmatter.update(file, map);
				}
			});
		}
	}
}
