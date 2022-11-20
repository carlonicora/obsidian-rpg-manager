import {AbstractView} from "../../../managers/viewsManager/abstracts/AbstractView";
import {AbtPlot} from "../plots/AbtPlot";
import {StoryCirclePlot} from "../plots/StoryCirclePlot";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {AbtInterface} from "../interfaces/AbtInterface";
import {StoryCircleInterface} from "../interfaces/StoryCircleInterface";
import {ContentEditorService} from "../../contentEditorService/ContentEditorService";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {HelpService} from "../../helpService/HelpService";

export class PlotView extends AbstractView {
	private _abtDescription = '## ABT Plot\n' +
		'The **ABT Plot** is a way of dividing a campaign, adventure or act into manageable chunks that create a positive impact on your players.\n' +
		'**Need**: The *need* part should introduce the player characters to what they need to do.\n' +
		'**And**:The *and* part should see the player characters decide to try and achieve their goals and get on with it.\n' +
		'**But**: The *but* part should introduce a problem for the player characters and give them a new goal\n' +
		'**Therefore**: The *therefore* part should allow the player characters to achieve their new goals and succeed.';

	private _storyCircleDescription = '## Story Circle Plot\n' +
		'The **Story Plot** is a way of dividing a campaign, adventure or act into manageable chunks that create a positive impact on your players.\n' +
		'**You**: Introduce the player characters to their current life.\n' +
		'**Need**: Make them **feel** there is something they need to achieve.\n' +
		'**Go**: Allow them to decide to try and get what they need.\n' +
		'**Search**: The player characters should try and get it.\n' +
		'**Find**: When they find what they were looking for, the player characters should realise there is a **problem**, and that their real goal is something different.\n' +
		'**Take**: The player characters should understand what they need to do next\n' +
		'**Return**: and they should find a way of reaching their new goal.\n' +
		'**Change**: Finally, they should achieve the final goal and be rewarded for it.';

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
			this.api.service(HelpService).add(plotContainerTitleEl, this._abtDescription);

			this._renderAbtPlot(model, plot, plotContainerDetailsEl);
		} else if (plot instanceof StoryCirclePlot){
			plotContainerTitleEl.textContent = 'Story Circle Plot';
			this.api.service(HelpService).add(plotContainerTitleEl, this._storyCircleDescription);
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
