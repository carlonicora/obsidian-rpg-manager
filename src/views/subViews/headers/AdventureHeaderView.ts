import {AbstractPlotHeaderView} from "../../abstracts/AbstractPlotHeaderView";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {AdventureInterface} from "../../../databases/components/interfaces/AdventureInterface";

export class AdventureHeaderView extends AbstractPlotHeaderView {
	protected currentElement: AdventureInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.render(container, data);

		if (this.settings.usePlotStructures && data.currentElement.hasAbtPlot && !data.currentElement.abt.isEmpty){
			this.addAbtPlot(data.currentElement.abt);
		}
		if (this.settings.usePlotStructures && data.currentElement.hasStoryCirclePlot && !data.currentElement.storyCircle.isEmpty){
			this.addStoryCirclePlot(data.currentElement.storyCircle);
		}
	}
}
