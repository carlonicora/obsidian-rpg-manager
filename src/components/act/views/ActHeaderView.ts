import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {HeaderResponseElementInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../../REFACTOR/responses/enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../../../REFACTOR/views/abstracts/AbstractPlotHeaderView";
import {HeadlessTableView} from "../../../../REFACTOR/views/HeadlessTableView";
import {ActInterface} from "../interfaces/ActInterface";
import {AnalyserInterface} from "../../../../REFACTOR/services/analyser/interfaces/AnalyserInterface";
import {AnalyserReportType} from "../../../../REFACTOR/services/analyser/enums/AnalyserReportType";
import {SceneBuilderModal} from "../../../../REFACTOR/services/sceneBuilder/modals/SceneBuilderModal";

export class ActHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: ActInterface;
	private _analyser: AnalyserInterface|undefined;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);
		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);
		const sceneBuilderContinerEl = this.headerTitleEl.createDiv();
		const sceneBuilderButtonEl = sceneBuilderContinerEl.createEl('button', {cls: 'actionButton', text: 'SceneModel Builder'});
		sceneBuilderButtonEl.addEventListener('click', () => {
			new SceneBuilderModal(this.app, this.currentComponent).open();
		});

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.StoryCircleSelector:
					headlessTable.addRow(element, this.addStoryCircleStageSelector.bind(this));
					break;
				case HeaderResponseType.AbtSelector:
					headlessTable.addRow(element, this.addAbtStageSelector.bind(this));
					if (this.currentComponent.abtStage !== undefined)
						this._analyser = element.additionalInformation.sceneAnalyser as AnalyserInterface;

					break;
				case HeaderResponseType.SceneAnalyser:
					this._analyser = element.additionalInformation.sceneAnalyser as AnalyserInterface;
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element),
						this.sourcePath,
					);
					break;
			}
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);

		if (this._analyser !== undefined){
			this._analyser.render(AnalyserReportType.Extended, this.headerContainerEl);
		}

		if (this.settings.usePlotStructures && data.currentComponent.hasAbtPlot && !data.currentComponent.abt.isEmpty){
			this.addAbtPlot(data.currentComponent.abt);
		}
		if (this.settings.usePlotStructures && data.currentComponent.hasStoryCirclePlot && !data.currentComponent.storyCircle.isEmpty){
			this.addStoryCirclePlot(data.currentComponent.storyCircle);
		}
	}
}
