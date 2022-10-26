import {AbstractPlotHeaderView} from "../../../../REFACTOR/views/abstracts/AbstractPlotHeaderView";
import {HeaderResponseInterface} from "../../../../REFACTOR/responses/interfaces/HeaderResponseInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";
export class AdventureHeaderView extends AbstractPlotHeaderView {
	protected currentComponent: AdventureInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.settings.usePlotStructures && data.currentComponent.hasAbtPlot && !data.currentComponent.abt.isEmpty)
			this.addAbtPlot(data.currentComponent.abt);

		if (this.settings.usePlotStructures && data.currentComponent.hasStoryCirclePlot && !data.currentComponent.storyCircle.isEmpty)
			this.addStoryCirclePlot(data.currentComponent.storyCircle);

	}
}
