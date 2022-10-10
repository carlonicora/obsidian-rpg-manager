import {SceneAnalyser, ThresholdResult} from "../../databases/SceneAnalyser";
import {ComponentType} from "../../databases/enums/ComponentType";
import {Component, MarkdownRenderer, TFile} from "obsidian";
import {AbstractStoryCircleStageSelectorView} from "./AbstractStoryCircleStageSelectorView";
import {HeaderResponseElementInterface} from "../../responses/interfaces/HeaderResponseElementInterface";
import {AbtStage} from "../../plots/enums/AbtStage";
import {SceneType} from "../../databases/enums/SceneType";
import {AbtInterface} from "../../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../plots/interfaces/StoryCircleInterface";

export abstract class AbstractPlotHeaderView extends AbstractStoryCircleStageSelectorView {
	private _addPlotElement(
		name: string,
		value: string,
		tableEl: HTMLTableElement,
		identifier: string,
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

		this.addEditorIcon(valueRowEl, this.currentComponent, identifier);
	}

	protected addAbtPlot(
		plot: AbtInterface,
	): void {
		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'ABT Plot'});

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		this._addPlotElement('need', plot.need, tableEl, 'plot.abt.need');
		this._addPlotElement('and', plot.and, tableEl, 'plot.abt.and');
		this._addPlotElement('but', plot.but, tableEl, 'plot.abt.but');
		this._addPlotElement('therefore', plot.therefore, tableEl, 'plot.abt.therefore');
	}

	protected addStoryCirclePlot(
		plot: StoryCircleInterface,
	): void {
		const plotEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-plot-container'});

		const headerEl = plotEl.createEl('h3', {cls: 'rpgm-table-header'});
		headerEl.createSpan({text: 'Story Circle Plot'});

		const tableEl = plotEl.createEl('table');
		tableEl.addClass('rpgm-table');

		this._addPlotElement('you', plot.you, tableEl, 'plot.storycircle.you');
		this._addPlotElement('need', plot.need, tableEl, 'plot.storycircle.need');
		this._addPlotElement('go', plot.go, tableEl, 'plot.storycircle.go');
		this._addPlotElement('search', plot.search, tableEl, 'plot.storycircle.search');
		this._addPlotElement('find', plot.find, tableEl, 'plot.storycircle.find');
		this._addPlotElement('take', plot.take, tableEl, 'plot.storycircle.take');
		this._addPlotElement('return', plot.return, tableEl, 'plot.storycircle.return');
		this._addPlotElement('change', plot.change, tableEl, 'plot.storycircle.change');
	}

	protected addSceneAnalyser(
		analyser: SceneAnalyser,
	): void {
		if (analyser.boredomReference === 0) return;
		const analyserEl: HTMLDivElement = this.headerContainerEl.createDiv({cls: 'rpgm-analyser'});

		if (analyser.actualRunningTime !== 0){
			const actualHoursDuration: number = Math.floor(analyser.actualRunningTime / (60 * 60));
			const actualMinutesDuration: number = Math.floor((analyser.actualRunningTime - (actualHoursDuration * (60 * 60)))/60);
			const actualDuration: string = (actualHoursDuration < 10 ? '0' + actualHoursDuration.toString() : actualHoursDuration.toString()) +
				':' +
				(actualMinutesDuration < 10 ? '0' + actualMinutesDuration.toString() : actualMinutesDuration.toString());

			analyserEl.createDiv().createSpan({cls: 'header', text: 'Actual ' + ComponentType[analyser.parentType] + ' duration: ' + actualDuration})
		}

		if (analyser.expectedRunningTime !== 0) {
			const expectedHoursDuration: number = Math.floor(analyser.expectedRunningTime / (60 * 60));
			const expectedMinutesDuration: number = Math.floor((analyser.expectedRunningTime - (expectedHoursDuration * (60 * 60)))/60);
			let expectedDuration: string = (expectedHoursDuration < 10 ? '0' + expectedHoursDuration.toString() : expectedHoursDuration.toString()) +
				':' +
				(expectedMinutesDuration < 10 ? '0' + expectedMinutesDuration.toString() : expectedMinutesDuration.toString());

			expectedDuration = 'Expected ' + ComponentType[analyser.parentType] + ' duration: ' + expectedDuration

			if (analyser.targetDuration !== undefined){
				const targetHours = Math.floor(analyser.targetDuration / 60);
				const targetMinutes = analyser.targetDuration % 60;
				expectedDuration += ' (Your target is ' +
					targetHours.toString() +
					':' +
					(targetMinutes < 10 ? '0': '') + targetMinutes.toString() +
					')';
			}

			analyserEl.createDiv().createSpan({cls: 'header', text: expectedDuration})
		}

		if (!analyser.isSingleScene) {
			const analyserHeadlineEl: HTMLSpanElement = analyserEl.createSpan({cls: 'header'});

			if (
				analyser.excitementLevel === ThresholdResult.Correct &&
				analyser.activityLevel === ThresholdResult.Correct &&
				analyser.varietyLevel === ThresholdResult.Correct &&
				analyser.boredomLevel === ThresholdResult.Correct &&
				(analyser.targetDurationLevel === ThresholdResult.Correct || analyser.targetDurationLevel === ThresholdResult.NotAnalysable)
			) {
				analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is perfect! Analysis Score: 100%';
				analyserHeadlineEl.addClass('perfect');
			} else {
				const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');
				const analyserTargetDurationElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserTargetDurationDescriptionEl: HTMLSpanElement = analyserTargetDurationElementEl.createSpan({cls: 'description'});
				const analyserActivityElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserActivityDescriptionEl: HTMLSpanElement = analyserActivityElementEl.createSpan({cls: 'description'});
				const analyserExcitementElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserExcitementDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});
				const analyserVarietyElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserVarietyDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});
				const analyserBoredomElementEl: HTMLLIElement = analyserListEl.createEl('li');
				const analyserBoredomDescriptionEl: HTMLSpanElement = analyserExcitementElementEl.createSpan({cls: 'description'});

				let warningErrorClass = '';

				if (analyser.expectedRunningTime !== 0 && analyser.targetDuration !== undefined) {
					switch (analyser.targetDurationLevel) {
						case ThresholdResult.Correct:
							analyserTargetDurationElementEl.textContent = 'The expected duration is in line with your target session duration';
							break;
						case ThresholdResult.CriticallyHigh:
							warningErrorClass = 'error';
							analyserTargetDurationElementEl.textContent = 'The session is going to be too long: ';
							analyserTargetDurationDescriptionEl.textContent = '(' + analyser.durationScenePercentage + '% longer than your target)';
							break;
						case ThresholdResult.High:
							warningErrorClass = 'warning';
							analyserTargetDurationElementEl.textContent = 'The session might be too long: ';
							analyserTargetDurationDescriptionEl.textContent = '(' + analyser.durationScenePercentage + '% longer than your target)';
							break;
						case ThresholdResult.Low:
							warningErrorClass = 'warning';
							analyserTargetDurationElementEl.textContent = 'The session might be short: ';
							analyserTargetDurationDescriptionEl.textContent = '(' + analyser.durationScenePercentage + '% shorter than your target)';
							break;
						case ThresholdResult.CriticallyLow:
							warningErrorClass = 'error';
							analyserTargetDurationElementEl.textContent = 'The session is too short: ';
							analyserTargetDurationDescriptionEl.textContent = '(' + analyser.durationScenePercentage + '% shorter than your target)';
							break;
					}

					if (analyser.targetDurationLevel !== ThresholdResult.Correct) {
						analyserTargetDurationElementEl.appendChild(analyserTargetDurationDescriptionEl as Node);
						analyserTargetDurationElementEl.addClass(warningErrorClass);
					}
				}

				switch (analyser.activityLevel) {
					case ThresholdResult.Correct:
						analyserActivityElementEl.textContent = 'The amount of active scenes is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						warningErrorClass = 'error';
						analyserActivityElementEl.textContent = 'Too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						warningErrorClass = 'warning';
						analyserActivityElementEl.textContent = 'Maybe too many active scenes: ';
						analyserActivityDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						warningErrorClass = 'warning';
						analyserActivityElementEl.textContent = 'Maybe not enough active scenes: ';
						analyserActivityDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
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
						analyserExcitementElementEl.textContent = 'The amount of exciting time is balanced';
						break;
					case ThresholdResult.CriticallyHigh:
						warningErrorClass = 'error';
						analyserExcitementElementEl.textContent = 'Too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.High:
						warningErrorClass = 'warning';
						analyserExcitementElementEl.textContent = 'Maybe too much excitement: ';
						analyserExcitementDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.Low:
						warningErrorClass = 'warning';
						analyserExcitementElementEl.textContent = 'Maybe not enough excitement: ';
						analyserExcitementDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
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
						analyserVarietyElementEl.textContent = 'The variety of scene types is balanced';
						break;
					case ThresholdResult.Low:
						warningErrorClass = 'warning';
						analyserVarietyElementEl.textContent = 'Maybe not enough variety: ';
						analyserVarietyDescriptionEl.textContent = '(only ';
						break;
					case ThresholdResult.CriticallyLow:
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
						analyserBoredomElementEl.textContent = 'The scenes are not repetitive';
						break;
					case ThresholdResult.High:
						warningErrorClass = 'warning';
						analyserBoredomElementEl.textContent = 'Maybe a bit repetitive: ';
						analyserBoredomDescriptionEl.textContent = '(';
						break;
					case ThresholdResult.CriticallyHigh:
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

				const score = analyser.calculateScore();
				if (score < 50){
					analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is not balanced!';
					analyserHeadlineEl.addClass('error');
				} else if (score < 75) {
					analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' still requires some work to be balanced!';
					analyserHeadlineEl.addClass('warning');
				} else {
					analyserHeadlineEl.textContent = 'The ' + ComponentType[analyser.parentType] + ' is balanced!';
					analyserHeadlineEl.addClass('balanced');
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
					this.manipulators.codeblock.update(
						'data.abtStage',
						abtSelectorEl.value.toLowerCase(),
					);
				}
			});
		}
	}
}
