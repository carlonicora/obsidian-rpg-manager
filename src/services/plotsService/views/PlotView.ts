import {AbstractView} from "../../../managers/viewsManager/abstracts/AbstractView";
import {AbtPlot} from "../plots/AbtPlot";
import {StoryCirclePlot} from "../plots/StoryCirclePlot";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {AbtInterface} from "../interfaces/AbtInterface";
import {StoryCircleInterface} from "../interfaces/StoryCircleInterface";
import {ContentEditorService} from "../../contentEditorService/ContentEditorService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";

export class PlotView extends AbstractView {
	public render(
		model: ModelInterface,
		plot: AbtInterface|StoryCircleInterface,
		containerEl: HTMLElement,
	): void {
		const plotContainerEl: HTMLDivElement = containerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container'});
		const plotContainerTitleEl: HTMLDivElement = plotContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-title'});
		const plotContainerDetailsEl: HTMLDivElement = plotContainerEl.createDiv({cls: 'rpg-manager-header-container-info-plot-container-elements'});

		if (plot instanceof AbtPlot) {
			plotContainerTitleEl.textContent = 'ABT Plot';
			this._renderAbtPlot(model, plot, plotContainerDetailsEl);
		} else if (plot instanceof StoryCirclePlot){
			plotContainerTitleEl.textContent = 'Story Circle Plot';
			this._renderStoryCirclePlot(model, plot, plotContainerDetailsEl);
		}
	}

	private _renderAbtPlot(
		model: ModelInterface,
		plot: AbtPlot,
		containerEl: HTMLElement,
	): void {
		this._renderPlotElement(model, 'plot.abt.need', 'Need', plot.need, containerEl);
		this._renderPlotElement(model, 'plot.abt.and', 'And', plot.and, containerEl);
		this._renderPlotElement(model, 'plot.abt.but', 'But', plot.but, containerEl);
		this._renderPlotElement(model, 'plot.abt.therefore', 'Therefore', plot.therefore, containerEl);
	}

	private _renderStoryCirclePlot(
		model: ModelInterface,
		plot: StoryCirclePlot,
		containerEl: HTMLElement,
	): void {
		this._renderPlotElement(model, 'plot.storycircle.you', 'You', plot.you, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.need', 'Need', plot.need, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.go', 'Go', plot.go, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.search', 'Search', plot.search, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.find', 'Find', plot.find, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.take', 'Take', plot.take, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.return', 'Return', plot.return, containerEl);
		this._renderPlotElement(model, 'plot.storycircle.change', 'Change', plot.change, containerEl);
	}

	private _renderPlotElement(
		model: ModelInterface,
		editableField: string,
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
		setIcon(plotEditorEl, 'edit');

		plotEditorEl.addEventListener('click', () => {
			this.api.service(ContentEditorService).open(model, editableField);
		});
	}
}
