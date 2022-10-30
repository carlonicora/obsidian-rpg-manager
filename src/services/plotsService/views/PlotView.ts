import {AbstractView} from "../../../managers/viewsManager/abstracts/AbstractView";
import {AbtPlot} from "../plots/AbtPlot";
import {StoryCirclePlot} from "../plots/StoryCirclePlot";
import {Component, MarkdownRenderer} from "obsidian";
import {AbtInterface} from "../interfaces/AbtInterface";
import {StoryCircleInterface} from "../interfaces/StoryCircleInterface";

export class PlotView extends AbstractView {
	public render(
		plot: AbtInterface|StoryCircleInterface,
		containerEl: HTMLElement,
	): void {
		const plotContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container'});
		const plotContainerTitleEl: HTMLDivElement = plotContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-title'});
		const plotContainerDetailsEl: HTMLDivElement = plotContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements'});

		if (plot instanceof AbtPlot) {
			plotContainerTitleEl.textContent = 'ABT Plot';
			this._renderAbtPlot(plot, plotContainerDetailsEl);
		} else if (plot instanceof StoryCirclePlot){
			plotContainerTitleEl.textContent = 'Story Circle Plot';
			this._renderStoryCirclePlot(plot, plotContainerDetailsEl);
		}
	}

	private _renderAbtPlot(
		plot: AbtPlot,
		containerEl: HTMLElement,
	): void {
		this._renderPlotElement('Need', plot.need, containerEl);
		this._renderPlotElement('And', plot.and, containerEl);
		this._renderPlotElement('But', plot.but, containerEl);
		this._renderPlotElement('Therefore', plot.therefore, containerEl);
	}

	private _renderStoryCirclePlot(
		plot: StoryCirclePlot,
		containerEl: HTMLElement,
	): void {
		this._renderPlotElement('You', plot.you, containerEl);
		this._renderPlotElement('Need', plot.need, containerEl);
		this._renderPlotElement('Go', plot.go, containerEl);
		this._renderPlotElement('Search', plot.search, containerEl);
		this._renderPlotElement('Find', plot.find, containerEl);
		this._renderPlotElement('Take', plot.take, containerEl);
		this._renderPlotElement('Return', plot.return, containerEl);
		this._renderPlotElement('Change', plot.change, containerEl);
	}

	private _renderPlotElement(
		title: string,
		description: string,
		containerEl: HTMLElement,
	): void {
		const plotElementContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements-container clearfix'});

		plotElementContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements-container-title', text: title});

		const plotDescriptionEl: HTMLDivElement = plotElementContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements-container-description'});
		MarkdownRenderer.renderMarkdown(
			description,
			plotDescriptionEl,
			'',
			null as unknown as Component,
		);

		const plotEditorEl: HTMLDivElement = plotElementContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements-container-editor'});
		//TODO edit button
	}
}
