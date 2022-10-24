import {SubplotInterface} from "../interfaces/SubplotInterface";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {HeadlessTableView} from "../../../REFACTOR/views/HeadlessTableView";
import {HeaderResponseElementInterface} from "../../../responses/interfaces/HeaderResponseElementInterface";
import {AbstractPlotHeaderView} from "../../../REFACTOR/views/abstracts/AbstractPlotHeaderView";

export class SubplotHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: SubplotInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

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
