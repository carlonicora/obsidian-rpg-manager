import {AbstractHeaderView} from "../../../../views/abstracts/AbstractHeaderView";
import {SubplotInterface} from "../interfaces/SubplotInterface";
import {HeaderResponseInterface} from "../../../../responses/interfaces/HeaderResponseInterface";
import {SceneAnalyser} from "../../../../analyser/SceneAnalyser";
import {HeadlessTableView} from "../../../../views/HeadlessTableView";
import {HeaderResponseElementInterface} from "../../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../../responses/enums/HeaderResponseType";
import {AbstractPlotHeaderView} from "../../../../views/abstracts/AbstractPlotHeaderView";

export class SubplotHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: SubplotInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		const analyser: SceneAnalyser|undefined = undefined;

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			element.value.fillContent(
				this.createContainerEl(element),
				this.sourcePath,
			);
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);


		if (this.settings.usePlotStructures && data.currentComponent.hasAbtPlot && !data.currentComponent.abt.isEmpty){
			this.addAbtPlot(data.currentComponent.abt);
		}
		if (this.settings.usePlotStructures && data.currentComponent.hasStoryCirclePlot && !data.currentComponent.storyCircle.isEmpty){
			this.addStoryCirclePlot(data.currentComponent.storyCircle);
		}
	}
}
