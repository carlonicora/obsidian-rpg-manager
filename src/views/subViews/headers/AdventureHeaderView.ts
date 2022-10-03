import {AbstractPlotHeaderView} from "../../../abstracts/AbstractPlotHeaderView";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {AdventureInterface} from "../../../database/components/interfaces/AdventureInterface";

export class AdventureHeaderView extends AbstractPlotHeaderView {
	protected currentElement: AdventureInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.settings.usePlotStructures && data.currentElement.hasAbtPlot){
			this.addAbtPlot(data.currentElement.abt);
		}
		if (this.settings.usePlotStructures && data.currentElement.hasStoryCirclePlot){
			this.addStoryCirclePlot(data.currentElement.storyCircle);
		}
	}
}
