import {SceneAnalyser, ThresholdResult} from "../helpers/SceneAnalyser";
import {ComponentType} from "../enums/ComponentType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractStoryCircleStageSelectorView} from "./AbstractStoryCircleStageSelectorView";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {AbtStage} from "../enums/AbtStage";
import {EditorSelector} from "../helpers/EditorSelector";
import {SceneType} from "../enums/SceneType";
import {AbtInterface} from "../database/plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../database/plots/interfaces/StoryCircleInterface";

export abstract class AbstractPlotHeaderView extends AbstractStoryCircleStageSelectorView {
	private _addPlotElement(
		name: string,
		value: string,
		tableEl: HTMLTableElement,
	): void {
		const row = tableEl.createEl('tr');
		row.createEl('td', {cls: 'header', text: name});
		const valueRowEl = row.createEl('td');

		MarkdownRenderer.renderMarkdown(
			value,
			valueRowEl,
			this.sourcePath,
			null as unknown as Component,
		);
	}

	protected addAbtPlot(
		plot: AbtInterface,
	): void {
		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'ABT Plot'});
		const titleEditor = headerEl.createEl('span', {cls: 'rpgm-td-edit', text: '</>'});
		titleEditor.addEventListener('click', () => {
			EditorSelector.select(this.app, this.currentElement);
		})

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		this._addPlotElement('need', plot.need, tableEl);
		this._addPlotElement('and', plot.and, tableEl);
		this._addPlotElement('but', plot.but, tableEl);
		this._addPlotElement('therefore', plot.therefore, tableEl);
	}

	protected addStoryCirclePlot(
		plot: StoryCircleInterface,
	): void {
		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'Story Circle Plot'});
		const titleEditor = headerEl.createEl('span', {cls: 'rpgm-td-edit', text: 'edit'});
		titleEditor.addEventListener('click', () => {
			EditorSelector.select(this.app, this.currentElement);
		})

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		this._addPlotElement('you', plot.you, tableEl);
		this._addPlotElement('need', plot.need, tableEl);
		this._addPlotElement('go', plot.go, tableEl);
		this._addPlotElement('search', plot.search, tableEl);
		this._addPlotElement('find', plot.find, tableEl);
		this._addPlotElement('take', plot.take, tableEl);
		this._addPlotElement('return', plot.return, tableEl);
		this._addPlotElement('change', plot.change, tableEl);
	}

	protected addActBalance(
		analyser: SceneAnalyser,
	): void {
		if (analyser.boredomReference === 0) return;
		const analyserEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-analyser'});

		if (analyser.expectedRunningTime !== 0) {
			const expectedHoursDuration: number = Math.floor(analyser.expectedRunningTime / (60 * 60));
			const expectedMinutesDuration: number = Math.floor((analyser.expectedRunningTime - (expectedHoursDuration * (60 * 60)))/60);
			const expectedDuration: string = (expectedHoursDuration < 10 ? '0' + expectedHoursDuration.toString() : expectedHoursDuration.toString()) +
				':' +
				(expectedMinutesDuration < 10 ? '0' + expectedMinutesDuration.toString() : expectedMinutesDuration.toString());

			analyserEl.createDiv().createSpan({cls: 'header', text: 'Expected ' + ComponentType[analyser.parentType] + ' duration: ' + expectedDuration})
		}

		if (!analyser.isSingleScene) {
			const analyserHeadlineEl: HTMLSpanElement = analyserEl.createSpan({cls: 'header'});

			if (
				analyser.excitementLevel === ThresholdResult.Correct &&
				analyser.activityLevel === ThresholdResult.Correct &&
				analyser.varietyLevel === ThresholdResult.Correct &&
				analyser.boredomLevel === ThresholdResult.Correct
			) {
				analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is balanced! Analysis Score: 100%';
			} else {
				analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is not balanced!';
				analyserHeadlineEl.addClass('warning');
				const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');
				const analyserActivityElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserActivityDescriptionEl: HTMLSpanElement = analyserActivityElementEl.createSpan({cls: 'description'});
				const analyserExcitementElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserExcitementDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});
				const analyserVarietyElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserVarietyDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});
				const analyserBoredomElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserBoredomDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});

				let score=0;
				let warningErrorClass = '';

				switch (analyser.activityLevel) {
					case ThresholdResult.Correct:
						score += 25;
						analyserActivityElementEl.textContent = 'The amount of active scenes is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						score += 5;
						warningErrorClass = 'error';
						analyserActivityElementEl.textContent = 'Too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						score += 15;
						warningErrorClass = 'warning';
						analyserActivityElementEl.textContent = 'Maybe too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						score += 15;
						warningErrorClass = 'warning';
						analyserActivityElementEl.textContent = 'Maybe not enough active scenes: ';
						analyserActivityDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
						score += 5;
						warningErrorClass = 'error';
						analyserActivityElementEl.textContent = 'Not enough active scenes: ';
						analyserActivityDescriptionEl.textContent = '(just ';
						break;
				}

				if (analyser.activityLevel !== ThresholdResult.Correct) {
					analyserActivityElementEl.appendChild(analyserActivityDescriptionEl as Node);
					analyserActivityElementEl.addClass(warningErrorClass);
					analyserActivityDescriptionEl.textContent += analyser.activeScenePercentage + '% out of ' + analyser.targetActiveScenePercentage + '% are active)'
				}

				switch (analyser.excitementLevel) {
					case ThresholdResult.Correct:
						score += 15;
						analyserExcitementElementEl.textContent = 'The amount of exciting time is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						score += 5;
						warningErrorClass = 'error';
						analyserExcitementElementEl.textContent = 'Too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						score += 15;
						warningErrorClass = 'warning';
						analyserExcitementElementEl.textContent = 'Maybe too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						score += 15;
						warningErrorClass = 'warning';
						analyserExcitementElementEl.textContent = 'Maybe not enough excitement: ';
						analyserExcitementDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
						score += 5;
						warningErrorClass = 'error';
						analyserExcitementElementEl.textContent = 'Not enough excitement: ';
						analyserExcitementDescriptionEl.textContent = '(just ';
						break;
				}

				if (analyser.excitementLevel !== ThresholdResult.Correct) {
					analyserExcitementElementEl.appendChild(analyserExcitementDescriptionEl as Node);
					analyserExcitementElementEl.addClass(warningErrorClass);
					analyserExcitementDescriptionEl.textContent += analyser.excitingScenePercentage + '% of the running time out of ' + analyser.targetExcitingScenePercentage + '% is exciting)'
				}

				switch (analyser.varietyLevel) {
					case ThresholdResult.Correct:
						score += 25;
						analyserVarietyElementEl.textContent = 'The variety of scene types is balanced';
						break;
					case ThresholdResult.Low:
						score += 15;
						warningErrorClass = 'warning';
						analyserVarietyElementEl.textContent = 'Maybe not enough variety: ';
						analyserVarietyDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
						score += 5;
						warningErrorClass = 'error';
						analyserVarietyElementEl.textContent = 'Not enough variety: ';
						analyserVarietyDescriptionEl.textContent = '(just ';
						break;
				}

				if (analyser.varietyLevel !== ThresholdResult.Correct) {
					analyserVarietyElementEl.appendChild(analyserVarietyDescriptionEl as Node);
					analyserVarietyElementEl.addClass(warningErrorClass);
					analyserVarietyDescriptionEl.textContent += analyser.varietyCount + '  out of ' + (Object.keys(SceneType).length / 2) + ' available types are used)'
				}

				switch (analyser.boredomLevel) {
					case ThresholdResult.Correct:
						score += 25;
						analyserBoredomElementEl.textContent = 'The scenes are not repetitive';
						break;
					case ThresholdResult.High:
						score += 15;
						warningErrorClass = 'warning';
						analyserBoredomElementEl.textContent = 'Maybe a bit repetitive: ';
						analyserBoredomDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.CriticallyHigh:
						score += 5;
						warningErrorClass = 'error';
						analyserBoredomElementEl.textContent = 'Repetitive: ';
						analyserBoredomDescriptionEl.textContent = '(really, ';
						break;
				}

				if (analyser.boredomLevel !== ThresholdResult.Correct) {
					analyserBoredomElementEl.appendChild(analyserBoredomDescriptionEl as Node);
					analyserBoredomElementEl.addClass(warningErrorClass);
					analyserBoredomDescriptionEl.textContent += analyser.boredomAmount + ' scene types repeated  in ' + analyser.boredomReference + ' scenes)'
				}

				analyserHeadlineEl.textContent += ' Analysis Score: ' + score + '%';
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
